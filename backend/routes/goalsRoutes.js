const express = require('express');
const router = express.Router();
const {
    addGoal,
    getGoalById,
    getAllGoals,
    updateGoal,
    deleteGoal
} = require('../controllers/goalsController');

// Define routes
router.post('/', addGoal);               // POST /goals
router.get('/:id', getGoalById);         // GET /goals/:id
router.get('/', getAllGoals);            // GET /goals
router.put('/:id', updateGoal);          // PUT /goals/:id
router.delete('/:id', deleteGoal);       // DELETE /goals/:id

module.exports = router;
