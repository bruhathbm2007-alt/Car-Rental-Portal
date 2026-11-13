
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Import cars API
const carsRoutes = require('./routes/cars');

const bookingsRoutes = require('./routes/bookings');

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Use cars API
app.use('/api/cars', carsRoutes);   

app.use(express.json());
app.use('/api/bookings', bookingsRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
