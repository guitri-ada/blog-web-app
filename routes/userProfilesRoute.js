const express = require('express');
const router = express.Router();
const UserProfiles = require('../models/UserProfiles');

// Route to get all UserProfiles
router.get('/', async (req, res) => {
    try {
        const userProfiles = await UserProfiles.find();
        res.status(200).json(userProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a UserProfile by username
router.get('/:username', async (req, res) => {
    try {
        const profile = await UserProfiles.findOne({ username: req.params.username });
        if (!profile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new UserProfile
router.post('/', async (req, res) => {
    const { username, bio, avatar } = req.body;

    if (!username || !bio) {
        return res.status(400).json({ message: 'Username and bio are required' });
    }

    try {
        const newUserProfile = new UserProfiles({ username, bio, avatar });
        await newUserProfile.save();
        res.status(201).json(newUserProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a UserProfile
router.put('/:username', async (req, res) => {
    const { bio, avatar } = req.body;

    try {
        const updatedProfile = await UserProfiles.findOneAndUpdate(
            { username: req.params.username },
            { bio, avatar },
            { new: true, runValidators: true }
        );
        if (!updatedProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a UserProfile
router.delete('/:username', async (req, res) => {
    try {
        const deletedProfile = await UserProfiles.findOneAndDelete({ username: req.params.username });
        if (!deletedProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
