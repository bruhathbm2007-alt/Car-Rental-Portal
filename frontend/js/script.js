
const carsContainer = document.getElementById('cars-container');
const carSelect = document.getElementById('car_id');
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');

// Load cars from backend API
async function loadCars() {
    try {
        const response = await fetch('/api/cars');

        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }

        const cars = await response.json();

        carsContainer.innerHTML = '';
        carSelect.innerHTML = '<option value="">Select a Car</option>';

        // Display each car
        cars.forEach(car => {
            const carCard = document.createElement('div');

            carCard.className = 'car-card';

            // Select the correct car image
            let image = '';

            if (car.brand === 'Maruti Suzuki') {
                image = 'images/swift.jpg';
            } else if (car.brand === 'Hyundai') {
                image = 'images/creta.jpg';
            } else if (car.brand === 'Tata') {
                image = 'images/nexon.jpg';
            }

            carCard.innerHTML = `
                <img src="${image}" alt="${car.brand} ${car.model}" class="car-image">

                <h3>${car.brand} ${car.model}</h3>

                <p>Year: ${car.year}</p>

                <p class="price">₹${car.price_per_day} / day</p>

                <p>Status: ${car.availability ? 'Available' : 'Not Available'}</p>
            `;

            carsContainer.appendChild(carCard);

            // Add available cars to dropdown
            if (car.availability) {
                const option = document.createElement('option');

                option.value = car.id;
                option.textContent = `${car.brand} ${car.model}`;

                carSelect.appendChild(option);
            }
        });

    } catch (error) {
        carsContainer.innerHTML = 'Unable to load cars.';
        console.log(error);
    }
}

// Submit booking form
bookingForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const bookingData = {
        customer_name: document.getElementById('customer_name').value,
        phone: document.getElementById('phone').value,
        car_id: carSelect.value,
        pickup_date: document.getElementById('pickup_date').value,
        return_date: document.getElementById('return_date').value
    };

    bookingMessage.textContent = 'Processing your booking...';

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        bookingMessage.textContent =
            `Booking successful! Booking ID: ${result.booking_id}. Total Amount: ₹${result.total_amount}`;

        bookingMessage.style.color = 'green';

        bookingForm.reset();

    } catch (error) {
        bookingMessage.textContent = error.message;
        bookingMessage.style.color = 'red';
    }
});

// Load cars when website opens
loadCars();
