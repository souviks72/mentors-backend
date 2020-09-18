const express = require('express');
const router = express.Router({mergeParams: true});
const {createMentor,getMentors} = require('../handlers/mentor');

router.post('/', createMentor);
router.get('/', getMentors);

module.exports = router;