// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const model = document.getElementById('model').value;
    const prompt = document.getElementById('prompt').value;

    const formData = new FormData();
    formData.append('model', model);
    formData.append('prompt', prompt);

    try {
        // Send the data to the Flask server
        const response = await fetch('/generate', {
            method: 'POST',
            body: formData
        });
        
        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();

        // Show the response container
        const responseContainer = document.getElementById('response-container');
        responseContainer.classList.remove('hidden');

        // Display the response and sentiment
        const responseText = document.getElementById('response-text');
        responseText.textContent = `Response: ${result.response}\nSentiment: ${result.sentiment}`;

        // Optional: Log sentiment for further actions
        console.log("Sentiment:", result.sentiment);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach the event handler to the form
document.getElementById('llm-form').addEventListener('submit', handleSubmit);
