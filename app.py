from flask import Flask, request, jsonify, send_file, render_template
import openai
from transformers import pipeline
import requests
import speech_recognition as sr
import functools
import sqlite3
import datetime
import base64
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from textblob import TextBlob

# Load environment variables
load_dotenv()

# Configuration
openai.api_key = os.getenv("OPENAI_API_KEY")
palm_api_key = os.getenv("GOOGLE_API_KEY")
claude_api_key = os.getenv("ANTHROPIC_API_KEY")
bard_api_key = os.getenv("GOOGLE_BARD_API_KEY")
email_user = os.getenv("EMAIL_USER")
SERVICE_ACCOUNT_FILE = os.getenv("SERVICE_ACCOUNT_FILE")
midjourney_api_key = os.getenv("MIDJOURNEY_API_KEY")

# Initialize Hugging Face pipelines with error handling
try:
    bert_model = pipeline("text-generation", model="bert-base-uncased")
except Exception as e:
    print(f"Failed to load BERT model: {e}")
    bert_model = None

try:
    llama3_model = pipeline("text-generation", model="meta-llama/Llama-3")
except Exception as e:
    print(f"Failed to load LLaMA-3 model: {e}")
    llama3_model = None

# Caching
cache = {}

# Database setup
def init_db():
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS queries (
                        id INTEGER PRIMARY KEY,
                        model_name TEXT,
                        prompt TEXT,
                        response TEXT,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                      )''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS events (
                        id INTEGER PRIMARY KEY,
                        title TEXT,
                        date TEXT,
                        time TEXT,
                        email TEXT,
                        reminder_sent INTEGER DEFAULT 0
                      )''')
    conn.commit()
    conn.close()

init_db()

# Functions for querying different models
def query_openai(prompt):
    try:
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error querying OpenAI: {e}"

def query_palm(prompt):
    url = f"https://api.palm.google/v1beta2/text:generate?key={palm_api_key}"
    headers = {"Content-Type": "application/json"}
    data = {
        "prompt": prompt,
        "maxOutputTokens": 150,
        "temperature": 0.7,
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()['candidates'][0]['output']
    except Exception as e:
        return f"Error querying PaLM: {e}"

def query_claude(prompt):
    url = "https://api.anthropic.com/v1/complete"
    headers = {
        "x-api-key": claude_api_key,
        "Content-Type": "application/json",
    }
    data = {
        "prompt": prompt,
        "max_tokens_to_sample": 150,
        "temperature": 0.7,
        "model": "claude-v1",
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()['completion']
    except Exception as e:
        return f"Error querying Claude: {e}"

def query_bard(prompt):
    url = f"https://bard.google.com/api/v1/query?key={bard_api_key}"
    headers = {"Content-Type": "application/json"}
    data = {
        "input": {"text": prompt},
        "maxTokens": 150,
        "temperature": 0.7,
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()['output']
    except Exception as e:
        return f"Error querying Bard: {e}"

def query_bert(prompt):
    if bert_model:
        return bert_model(prompt, max_length=150, num_return_sequences=1)[0]['generated_text']
    return "BERT model is not available."

def query_llama3(prompt):
    if llama3_model:
        return llama3_model(prompt, max_length=150, num_return_sequences=1)[0]['generated_text']
    return "LLaMA-3 model is not available."

def query_midjourney(prompt):
    url = "https://api.midjourney.com/v1/generate"
    headers = {
        "Authorization": f"Bearer {midjourney_api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "prompt": prompt
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()['image_url']
    except Exception as e:
        return f"Error querying Midjourney: {e}"

def get_response(prompt, model_name):
    if model_name == "GPT-4":
        return query_openai(prompt)
    elif model_name == "PaLM":
        return query_palm(prompt)
    elif model_name == "Claude":
        return query_claude(prompt)
    elif model_name == "Bard":
        return query_bard(prompt)
    elif model_name == "BERT":
        return query_bert(prompt)
    elif model_name == "LLaMA-3":
        return query_llama3(prompt)
    elif model_name == "Midjourney":
        return query_midjourney(prompt)
    else:
        return "Invalid model selection."

# Cache decorator
def cache_results(func):
    @functools.wraps(func)
    def wrapper(prompt, model_name):
        key = f"{model_name}:{prompt}"
        if key in cache:
            return cache[key]
        result = func(prompt, model_name)
        cache[key] = result
        return result
    return wrapper

@cache_results
def generate_response(prompt, model_name):
    response = get_response(prompt, model_name)
    store_query_in_db(prompt, model_name, response)
    return response

def store_query_in_db(prompt, model_name, response):
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO queries (model_name, prompt, response) VALUES (?, ?, ?)", 
                   (model_name, prompt, response))
    conn.commit()
    conn.close()

def search_query_in_db(query):
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM queries WHERE prompt LIKE ?", ('%' + query + '%',))
    results = cursor.fetchall()
    conn.close()
    return results

# Email sending functions with OAuth 2.0
def get_gmail_service():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/gmail.send'])
    service = build('gmail', 'v1', credentials=creds)
    return service

def send_reminder_via_gmail(email, title, event_time):
    service = get_gmail_service()
    subject = f"Reminder: {title} at {event_time}"
    body = f"This is a reminder for your event: {title} at {event_time}."
    message = MIMEMultipart()
    message['From'] = email_user
    message['To'] = email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    try:
        service.users().messages().send(userId="me", body={'raw': raw_message}).execute()
        print("Email sent successfully")
    except HttpError as error:
        print(f"An error occurred: {error}")

# Flask App
app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')  

@app.route('/styles.css')
def styles():
    return send_file('styles.css')  

@app.route('/scripts.js')
def scripts():
    return send_file('scripts.js')  

@app.route('/generate', methods=['POST'])
def generate():
    # Get the user inputs from the form
    model = request.form['model']
    prompt = request.form['prompt']
    
    # Call the OpenAI API to generate a response
    try:
        response = openai.Completion.create(
            engine=model,  # Choose the model
            prompt=prompt,
            max_tokens=100  # Adjust as per your requirement
        )
        generated_response = response.choices[0].text.strip()
    except Exception as e:
        generated_response = f"Error: {str(e)}"

    # Pass the prompt and generated response to the response.html template
    return render_template('response.html', prompt=prompt, response=generated_response)

@app.route('/voice', methods=['POST'])
def voice():
    recognizer = sr.Recognizer()
    audio_file = request.files['audio'].read()
    
    # Save the audio file to a temporary file
    with open('temp.wav', 'wb') as temp_audio_file:
        temp_audio_file.write(audio_file)
    
    with sr.AudioFile('temp.wav') as source:
        audio = recognizer.record(source)
        prompt = recognizer.recognize_google(audio)
    
    model_name = request.form.get('model')
    response = generate_response(prompt, model_name)
    sentiment = analyze_sentiment(response)
    return jsonify({"response": response, "sentiment": sentiment})

@app.route('/add_event', methods=['POST'])
def add_event():
    title = request.form.get('title')
    date = request.form.get('date')
    time = request.form.get('time')
    email = request.form.get('email')
    
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO events (title, date, time, email) VALUES (?, ?, ?, ?)",
                   (title, date, time, email))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Event added successfully"})

@app.route('/check_reminders')
def check_reminders():
    now = datetime.datetime.now()
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events WHERE reminder_sent = 0 AND date = ? AND time <= ?", (now.date(), now.time().strftime('%H:%M:%S')))
    events = cursor.fetchall()
    conn.close()
    
    for event in events:
        send_reminder_via_gmail(event[4], event[1], f"{event[2]} {event[3]}")
        update_reminder_status(event[0])
    
    return jsonify({"message": "Reminders checked and sent"})

def update_reminder_status(event_id):
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE events SET reminder_sent = 1 WHERE id = ?", (event_id,))
    conn.commit()
    conn.close()

@app.route('/history')
def get_history():
    conn = sqlite3.connect('llm_aggregator.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM queries ORDER BY timestamp DESC")
    results = cursor.fetchall()
    conn.close()
    history = [{"model_name": row[1], "prompt": row[2], "response": row[3], "timestamp": row[4]} for row in results]
    return jsonify(history)

def analyze_sentiment(text):
    blob = TextBlob(text)
    if blob.sentiment.polarity > 0:
        return "Positive"
    elif blob.sentiment.polarity == 0:
        return "Neutral"
    else:
        return "Negative"

@app.route('/response')
def response_page():
    response = request.args.get('response')
    sentiment = request.args.get('sentiment')
    return render_template('response.html', response=response, sentiment=sentiment)

if __name__ == '__main__':
    app.run(debug=True)