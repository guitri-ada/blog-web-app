const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
});

module.exports = mongoose.model('UserProfiles', userProfileSchema);