const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve all static files in the 'src' folder
app.use(express.static(path.join(__dirname, 'src')));

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Route for the results.html page
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'results.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
