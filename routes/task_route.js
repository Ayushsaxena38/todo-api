const express = require('express');
const passport = require('passport');

const router = express.Router();
const taskController = require('../controllers/task_controller');

router.get('/',passport.authenticate('jwt',{session : false}),taskController.tasks);
router.get('/create-task',passport.authenticate('jwt',{session : false}),taskController.createTask);
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),taskController.delete);

module.exports = router;