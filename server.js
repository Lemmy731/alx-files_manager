// server.js
import express from 'express';
import routes from './routes/index.js';  // Import the routes

const app = express();

// Set the port from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

// Use the routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
