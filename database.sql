
CREATE DATABASE IF NOT EXISTS car_rental_db;

USE car_rental_db;

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT,
    price_per_day DECIMAL(10,2),
    availability BOOLEAN DEFAULT TRUE
);

-- Sample cars
INSERT INTO cars (brand, model, year, price_per_day, availability)
VALUES
('Maruti Suzuki', 'Swift', 2024, 1500, TRUE),
('Hyundai', 'Creta', 2025, 2500, TRUE),
('Tata', 'Nexon', 2024, 2000, TRUE);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    car_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    booking_status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
