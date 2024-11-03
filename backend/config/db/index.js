const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Database connection successful');
        })
        .catch((err) => {
            console.error('Database connection error');
        });
}

module.exports = { connectDB };