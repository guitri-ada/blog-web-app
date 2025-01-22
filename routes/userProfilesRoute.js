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
    try {
        console.log("Request Body:", req.body);

        const { username, bio, avatar } = req.body;
        if (!username || !bio) {
            return res.status(400).json({ message: 'Username and bio are required.' });
        }

        const newUserProfile = new UserProfiles(req.body);
        const savedProfile = await newUserProfile.save();

        res.status(201).json(savedProfile);
    } catch (error) {
        console.error("Error during profile creation:", error.message);
        res.status(500).json({ message: 'Failed to create profile.', error: error.message });
    }
});


// Route to update a UserProfile
router.put('/:username', async (req, res) => {
    try {
        const updatedProfile = await UserProfiles.findOneAndUpdate(
            { username: req.params.username },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
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
