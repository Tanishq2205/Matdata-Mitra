const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    address: {
        type: String,
        required: true
    },
    voterId: {
        type: String,
        required: true,
        unique: true
    },
    registered: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Voter', voterSchema);