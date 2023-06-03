const User = require('../models/user');
const Task = require('../models/task');

const jwt = require('jsonwebtoken');

function getUserIdFromToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, 'astroguruji');
    return decodedToken._id;
  } catch (error) {
    // Invalid or expired token
    return null;
  }
}

module.exports.tasks = async function(req,res){
    const authorizationHeader = req.headers.authorization;
  const userId = getUserIdFromToken(authorizationHeader);
  try{
    let tasks = await Task.find({'user':userId})
    if(tasks.length != 0){
        res.json(200,{
            message : "tasks",
            tasks : tasks
        })
    }else{
        res.json(200 , {
            message : "Zero Tasks Started"
        })
    }
  }catch(error){
    console.log('error :',error);
    return;
  }

}
module.exports.createTask = function(req,res){
    const authorizationHeader = req.headers.authorization;
    const userId = getUserIdFromToken(authorizationHeader);
    try{
        let user = User.findById(userId)
        if(user){
            try{
                let task = Task.create({
                    name : req.query.name,
                    details : req.query.details,
                    status : req.query.status,
                    user : userId
                });
                console.log(task);
                User.findById(userId)
                .then((user)=>{
                    user.tasks.push(task._id);
                    user.save();
                })
                res.json(200,{
                    message : "task is created successfully!"
                })
            }catch(error){
                console.log('error in creating the task : ',error);
                return;
            }
        }
    }catch(error){
        console.log('error in creating the task : ',error);
                return;
    }
}
module.exports.delete = async function(req,res){
    const authorizationHeader = req.headers.authorization;
    const userId = getUserIdFromToken(authorizationHeader);
    const taskId = req.params.id;
    try {
        let deleteresult = await Task.findOneAndDelete(taskId);
        console.log(deleteresult);
        try {
            let user = await User.findById(userId);
            user.task.poll(taskId);
            user.save();
            res.json(200,{
                message : "task is deleted successfully!"
            })
        } catch (error) {
            console.log('error in finding the user : ',error);
            return;
        }
    } catch (error) {
        console.log('error in deleting the task : ',error);
            return;
        
    }
}