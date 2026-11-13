
const express = require('express');
const router = express.Router();

const db = require('../config/db');

// Get all cars
router.get('/', async (req, res) => {
    try {
        const [cars] = await db.query('SELECT * FROM cars');

        res.json(cars);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching cars'
        });
    }
});

module.exports = router;
