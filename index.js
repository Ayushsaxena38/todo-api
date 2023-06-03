const express = require('express');
const app = express();
const port = 8000;

const passport = require('passport');
const passportStrategy = require('passport-jwt');
app.use(express.urlencoded());
const jwtStrategy = require('./config/passport-jwt-strategy');
app.use('/',require('./routes/index'));

app.use(passport.initialize());
app.listen(port , function(err){
    if(err){
        console.log('error in setting up the server : ',err );
    }
    console.log(`server is up and running on port : ${port}`);
})
