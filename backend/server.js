/**
 * To run the backend server from the terminal:
 *     npm run dev
 *
 *  OR
 *
 *    npm server.js
 */

require('dotenv').config();

const PORT = process.env.PORT;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Create an Express application.
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Application Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Listen for requests.
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
