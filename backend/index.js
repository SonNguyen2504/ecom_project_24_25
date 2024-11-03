const express = require('express'); 
const dotenv = require('dotenv');
const route = require('./routes');
const cors = require('cors');

dotenv.config();
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db.connectDB();

route(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});