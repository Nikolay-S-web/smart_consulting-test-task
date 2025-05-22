const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:4173'],
    }),
    express.json()
);

app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
});
