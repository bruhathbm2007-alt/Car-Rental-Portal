
# DriveEasy - Car Rental Portal

A simple full-stack Car Rental Portal developed using HTML, CSS, JavaScript, Node.js, Express.js and MySQL.

## Features

- Display available cars from the database.
- View car details and rental prices.
- Book a car by entering customer details.
- Calculate the total rental amount.
- Store booking details in MySQL.
- Fetch car information using REST APIs.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- API: REST API

## Project Setup

### 1. Clone the repository

Download or clone this repository to your computer.

### 2. Install dependencies

Open the project folder in VS Code and run:

npm install

### 3. Set up the database

Import the `database.sql` file into MySQL Workbench and execute it.

### 4. Configure environment variables

Create a file named `.env` in the main project folder.

Add your own MySQL details:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=car_rental_db

Replace the example values with your own MySQL credentials.

### 5. Start the server

Run this command in the project terminal:

node backend/server.js

### 6. Open the website

Visit:

http://localhost:3000

## API Endpoints

GET /api/cars - Fetch all cars

POST /api/bookings - Create a car booking

## Developed as a Full Stack Development College Project.
