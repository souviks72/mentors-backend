const db = require('../models/index');

exports.createMentor = async (req,res,next)=> {
    try{
        let mentor = await db.Mentor.create({
            name: req.body.name,
            email: req.body.email
        });
        res.status(200).json(mentor).send();
    }catch(err){
        return next({
            status: 500,
            message: `Cant add mentor: ${err}`
        })
    }
}

exports.getMentors = async (req,res,next) => {
    try{
        let mentors = await db.Mentor.find({}).populate("students",{
            name: true
        });
        
        
        res.status(200).json(mentors);
    }catch(err){
        return next({
            status: 500,
            message: `Cant get mentors: ${err}`
        })
    }
}