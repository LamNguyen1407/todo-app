const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,   // Hoặc `type: Date`
        required: true  // Đảm bảo lưu vào MongoDB
    }
});

module.exports = mongoose.model('ToDo', todoSchema);
