// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Connect = require('./connect');
// const Connection
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

Connect(MONGO_URI);

// Define routes here
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
