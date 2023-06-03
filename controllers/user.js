const User = require('../models/user');
const db = require('../config/mongoose');
const jwt = require('jsonwebtoken');
require('../config/passport-jwt-strategy');
module.exports.signup = async function(req,res){
    
    try{
        let user = await User.create({
            name : req.body.name,
            password : req.body.password,
        });
        res.json(200,{
            message : "user is created successfully!",
            token : 'Bearer'+jwt.sign(user.toJSON(),'astroguruji',{expiresIn : '100000'})
        });
        return;
    }catch(error){
        console.log('error is occured in creating the user : ',error);
        return;
    }
}

module.exports.login = async function (req, res) {
  const { name, password } = req.query;
  console.log(name, password);

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(user.toJSON(), 'astroguruji', { expiresIn: '1000000' });
    const authToken = `Bearer ${token}`; // Prepend "Bearer " to the token

    res.set('Authorization', authToken); // Set the Authorization header

    return res.status(200).json({
      message: "Logged In Successfully!",
      token
    });
  } catch (err) {
    console.log('Error in logging in:', err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


module.exports.checklogin = async function(req,res){
    console.log(req.headers.authorization);
    res.json(200,{
        message : "You are autherized"
    });
    return;
}
