const mongoose = require('mongoose');
const Student = require('./student');

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;