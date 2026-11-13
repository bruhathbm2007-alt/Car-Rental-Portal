
const express = require('express');
const router = express.Router();

const db = require('../config/db');

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const {
            customer_name,
            phone,
            car_id,
            pickup_date,
            return_date
        } = req.body;

        // Check car availability
        const [cars] = await db.query(
            'SELECT * FROM cars WHERE id = ? AND availability = TRUE',
            [car_id]
        );

        if (cars.length === 0) {
            return res.status(400).json({
                message: 'Car is not available'
            });
        }

        // Calculate rental days
        const pickup = new Date(pickup_date);
        const returning = new Date(return_date);

        const days = Math.ceil(
            (returning - pickup) / (1000 * 60 * 60 * 24)
        );

        if (
            !customer_name ||
            !phone ||
            !pickup_date ||
            !return_date ||
            !Number.isInteger(Number(car_id)) ||
            !Number.isFinite(days) ||
            days <= 0
        ) {
            return res.status(400).json({
                message: 'Please enter valid booking details'
            });
        }

        const total_amount = days * Number(cars[0].price_per_day);

        // Save booking in MySQL
        const [result] = await db.query(
            `INSERT INTO bookings
            (customer_name, phone, car_id, pickup_date,
             return_date, total_amount)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                customer_name,
                phone,
                car_id,
                pickup_date,
                return_date,
                total_amount
            ]
        );

        res.status(201).json({
            message: 'Booking created successfully!',
            booking_id: result.insertId,
            total_amount: total_amount
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Error creating booking'
        });
    }
});

module.exports = router;
