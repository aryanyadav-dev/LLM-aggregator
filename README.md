# LLM Aggregator 

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/3cffa9dc-aa41-4294-86d1-f325fde8db44" />

This Flask application provides an interface for querying various language models (OpenAI, Google LLaMa, Claude, Bard, Gemini, LLaMA-3) and Midjourney. It includes voice input functionality and event reminder features with email notifications.

## Features

- **Query Multiple Language Models:** Generate text using GPT-4, Google PaLM, Claude, Bard, BERT, LLaMA-3, and Midjourney.
- **Voice Input:** Convert spoken prompts into text and generate responses.
- **Event Management:** Add events and receive email reminders.
- **Sentiment Analysis:** Analyze sentiment of generated responses.

## Requirements

- Python 3.x
- Flask
- OpenAI API
- Google PaLM API
- Claude API
- Bard API
- Gemini and LLaMA-3 models from Hugging Face
- Midjourney API
- SpeechRecognition
- Google API Client
- SQLite
- TextBlob
- dotenv
- Email configuration

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/llm-aggregator.git
    cd llm-aggregator
    ```

2. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

    - On macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

4. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

5. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    OPENAI_API_KEY=your_openai_api_key
    GOOGLE_API_KEY=your_google_api_key
    ANTHROPIC_API_KEY=your_anthropic_api_key
    GOOGLE_BARD_API_KEY=your_google_bard_api_key
    EMAIL_USER=your_email@example.com
    SERVICE_ACCOUNT_FILE=path_to_your_service_account_file.json
    MIDJOURNEY_API_KEY=your_midjourney_api_key
    ```

6. Initialize the database:

    ```bash
    python -c 'from app import init_db; init_db()'
    ```

## Usage

1. Start the Flask server:

    ```bash
    python app.py
    ```

2. Open your browser and navigate to `http://127.0.0.1:5000` to access the application.

## API Endpoints

### `POST /generate`

Generate a response from the selected model.

**Request Body:**

- `model` (string): The model to use (e.g., "GPT-4", "PaLM", "Claude", "Bard", "BERT", "LLaMA-3", "Midjourney").
- `prompt` (string): The text prompt for the model.

**Response:**

- `response` (string): The generated response.
- `sentiment` (string): Sentiment analysis of the response ("positive", "negative", "neutral").

### `POST /voice`

Generate a response from a spoken prompt.

**Request Form Data:**

- `audio` (file): The audio file containing the spoken prompt.
- `model` (string): The model to use.

**Response:**

- `response` (string): The generated response.
- `sentiment` (string): Sentiment analysis of the response.

### `POST /events`

Add a new event for reminder.

**Request Form Data:**

- `title` (string): The event title.
- `date` (string): The event date (YYYY-MM-DD).
- `time` (string): The event time (HH:MM).
- `email` (string): The email address to send reminders.

**Response:**

- `message` (string): Confirmation message.

### `GET /check_reminders`

Check and send reminders for upcoming events.

**Response:**

- `message` (string): Confirmation message indicating reminders sent.


## Acknowledgments

- [OpenAI](https://openai.com/)
- [Google PaLM](https://cloud.google.com/palm)
- [Claude](https://www.anthropic.com/)
- [Bard](https://bard.google.com/)
- [Hugging Face](https://huggingface.co/)
- [Midjourney](https://midjourney.com/)
- [SpeechRecognition](https://pypi.org/project/SpeechRecognition/)
- [Google API Client](https://developers.google.com/gmail/api)
- [TextBlob](https://textblob.readthedocs.io/en/dev/)

