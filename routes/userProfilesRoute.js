const express = require('express');
const router = express.Router();
const UserProfiles = require('../models/UserProfiles');
const User = require('../models/User');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

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
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const profile = await UserProfiles.findOne({ user: user._id });
        if (!profile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new UserProfile
router.post('/', csrfProtection, async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { userId, firstname, lastname, bio } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const newUserProfile = new UserProfiles({
            user: userId,
            firstname,
            lastname,
            bio,
        });

        const savedProfile = await newUserProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        console.error("Error during profile creation:", error.message);
        res.status(500).json({ message: 'Failed to create profile.', error: error.message });
    }
});

// Route to update a UserProfile
router.put('/:username', csrfProtection, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedProfile = await UserProfiles.findOneAndUpdate(
            { user: user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error('Error during profile update:', error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
});

// Route to delete a UserProfile
router.delete('/:userId', csrfProtection, async (req, res) => {
    try {
        const deletedProfile = await UserProfiles.findOneAndDelete({ user: req.params.userId });
        if (!deletedProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;