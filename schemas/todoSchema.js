const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoScheme = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    date: {
        type: Date,
        default: Date.now()
    },

}, {
    timestamps: true,
    versionKey: false
});

module.exports = todoScheme;