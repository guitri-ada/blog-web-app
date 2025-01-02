const express = require('express');

const router = express.Router();

// Route to get all UserProfiles
router.get('/', async (req, res) => {
    try {
        const db = req.db;
        const userProfiles = await db.collection('UserProfiles').find().toArray();
        res.status(200).json(userProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a UserProfile by username
router.get('/:username', async (req, res) => {
    try {
        const db = req.db;
        const username = req.params.username;
        const userProfile = await db.collection('UserProfiles').findOne({ username: username });
        if (userProfile) {
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to edit an existing UserProfile
router.post('/:username', async (req, res) => {
    try {
        const db = req.db;
        const username = req.params.username;
        const updateData = req.body;

        const result = await db.collection('UserProfiles').updateOne(
            { username: username },
            { $set: updateData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Combined route to create and verify a new UserProfile
router.post('/', async (req, res) => {
    try {
        const db = req.db;
        const newUserProfile = req.body;
        await db.collection('UserProfiles').insertOne(newUserProfile);
        const userProfile = await db.collection('UserProfiles').findOne({ username: newUserProfile.username });
        if (userProfile) {
            res.status(201).json({ message: 'User profile created and verified successfully', userProfile });
        } else {
            res.status(500).json({ message: 'Failed to verify user profile after creation' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a UserProfile
router.delete('/:username', async (req, res) => {
    try {
        const db = req.db;
        const username = req.params.username;

        const result = await db.collection('UserProfiles').deleteOne({ username: username });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'User profile deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;