require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.config');
const routes = require('./routes/index.route');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Sites allowed to call the API from the browser (the frontend's URLs), comma-separated in .env
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
