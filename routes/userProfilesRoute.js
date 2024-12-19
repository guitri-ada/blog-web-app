const express = require('express');
const router = express.Router();
const UserProfiles = require('../models/UserProfiles');

// Get a specific user profile by username
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const userProfile = await UserProfiles.findOne({ username });
        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

// Create a new user profile
router.post('/', async (req, res) => {
    const { username, email, bio } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
    }

    try {
        const newUserProfile = new UserProfiles({ username, email, bio });
        await newUserProfile.save();
        res.status(201).json(newUserProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user profile' });
    }
});

module.exports = router;