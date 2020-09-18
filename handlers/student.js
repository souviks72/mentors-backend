const db = require('../models/index');

exports.createStudent = async (req,res,next) => {
    try{
        let student = await db.Student.create({
            name: req.body.name,
            email: req.body.email
        });
        res.status(200).json(student);
    }catch(err){
        return next({
            status: 500,
            message: `Can't add student: ${err}`
        });
    }
}

exports.assignMentor = async (req,res,next) => {
    try{
        let {email, students}  = req.body;
        let foundMentor = await db.Mentor.findOne({email});
        let foundStudents = [];
        students.forEach(async st =>{
            let student = await db.Student.findOneAndUpdate({email: st},{mentor: foundMentor._id},{new: true});
            foundStudents.push(student._id);

            foundMentor = await db.Mentor.findByIdAndUpdate(foundMentor._id,{
                $push: { "students": student }
            },{new: true});
        });
       
        return res.status(200).json(foundMentor);
    }catch(err){
        console.log(err)
        return next({err});
    }
}

// exports.assignMentor = async (req,res,next) => {
//     try{
//         let {email, student}  = req.body;
//         let foundMentor = await db.Mentor.findOne({email});
//         let foundStudent = await db.Student.findOneAndUpdate({email: student},{mentor: foundMentor._id},{new: true});
        
//         foundMentor.students.push(foundStudent._id);
//         await foundMentor.save();
//         return res.status(200).json(foundMentor);
//     }catch(err){
//         console.log(err)
//         return next({err});
//     }
// }

exports.changeMentor = async (req,res,next) => {
    try{
        let {newMentor,student} = req.body;
        let foundStudent = await db.Student.findOne({email: student});
        let oldMentor = await db.Mentor.findById(foundStudent.mentor);
        oldMentor.students.remove(foundStudent._id);
        await oldMentor.save();
        let mentor  = await db.Mentor.findOne({email: newMentor});
        foundStudent.mentor = mentor._id;
        await foundStudent.save();
        mentor.students.push(foundStudent._id);
        await mentor.save();
        return res.status(200).json({
            student,
            mentor
        });
    }catch(err){
        return next(err);
    }
}