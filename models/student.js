const mongoose = require('mongoose');
const Mentor = require('./mentor');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor"
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
