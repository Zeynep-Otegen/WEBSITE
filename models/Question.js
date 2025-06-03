const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['meslek', 'universite', 'sinav', 'kariyer', 'diger']
    },
    tags: [{
        type: String,
        trim: true
    }],
    answers: [{
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        isAccepted: {
            type: Boolean,
            default: false
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'archived'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Güncelleme tarihini otomatik güncelleme
questionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Question', questionSchema); 