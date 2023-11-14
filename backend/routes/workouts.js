/**
 * Contains all workout routes.
 */

const express = require('express');
const {
  createWorkout,
  getWorkout,
  getAllWorkouts,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Protect all of the following routes by requiring authentication.
router.use(requireAuth);

// Route to GET all workouts
router.get('/', getAllWorkouts);

// Route to GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

module.exports = router;
