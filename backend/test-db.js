
const db = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT * FROM cars');

        console.log('MySQL Connected Successfully!');
        console.log(rows);

        process.exit(0);
    } catch (error) {
        console.log('Database connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
