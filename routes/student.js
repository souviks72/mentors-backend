const express = require('express');
const router = express.Router({mergeParams: true});
const { createStudent,assignMentor,changeMentor } = require('../handlers/student');

router.post('/', createStudent);
router.patch('/assign-mentor', assignMentor);
router.patch('/change-mentor', changeMentor);
module.exports = router;