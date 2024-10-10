const db = require('../firebaseconfig'); // Import Firebase configuration

// Add a new goal
const addGoal = async (req, res) => {
    const { glassWastage, plasticWastage, otherWastage } = req.body;

    if (!glassWastage || !plasticWastage || !otherWastage) {
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        const goalRef = await db.collection('goals').add({
            glassWastage,
            plasticWastage,
            otherWastage,
            createdAt: new Date()
        });
        res.status(201).json({ id: goalRef.id });
    } catch (error) {
        console.error('Error adding goal: ', error);
        res.status(500).send('Error adding goal');
    }
};

// Get a goal by ID
const getGoalById = async (req, res) => {
    const goalId = req.params.id;

    try {
        const goalRef = db.collection('goals').doc(goalId);
        const doc = await goalRef.get();

        if (!doc.exists) {
            return res.status(404).send('Goal not found');
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error getting goal: ', error);
        res.status(500).send('Error getting goal');
    }
};

// Get all goals
const getAllGoals = async (req, res) => {
    try {
        const goalsSnapshot = await db.collection('goals').get();
        const goals = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(goals);
    } catch (error) {
        console.error('Error getting goals: ', error);
        res.status(500).send('Error getting goals');
    }
};

// Update a goal by ID
const updateGoal = async (req, res) => {
    const goalId = req.params.id;
    const { glassWastage, plasticWastage, otherWastage } = req.body;

    if (!glassWastage || !plasticWastage || !otherWastage) {
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        const goalRef = db.collection('goals').doc(goalId);
        await goalRef.update({
            glassWastage,
            plasticWastage,
            otherWastage,
            updatedAt: new Date()
        });
        res.status(200).send(`Goal updated with ID: ${goalId}`);
    } catch (error) {
        console.error('Error updating goal: ', error);
        res.status(500).send('Error updating goal');
    }
};

// Delete a goal by ID
const deleteGoal = async (req, res) => {
    const goalId = req.params.id;

    try {
        const goalRef = db.collection('goals').doc(goalId);
        await goalRef.delete();
        res.status(200).send(`Goal deleted with ID: ${goalId}`);
    } catch (error) {
        console.error('Error deleting goal: ', error);
        res.status(500).send('Error deleting goal');
    }
};

module.exports = {
    addGoal,
    getGoalById,
    getAllGoals,
    updateGoal,
    deleteGoal
};
