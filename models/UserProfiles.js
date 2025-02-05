const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    bio: { type: String, default: '' },
});

module.exports = mongoose.model('UserProfiles', userProfileSchema);