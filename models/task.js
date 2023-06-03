const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "Pending",
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestapms : true
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;