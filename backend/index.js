const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const goalRoutes = require('./routes/goalsRoutes'); // Import goal routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the goal routes
app.use('/goals', goalRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
