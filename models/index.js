const mongoose = require('mongoose');

mongoose.connect(process.env.DBURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.Mentor = require('./mentor');
module.exports.Student = require('./student');