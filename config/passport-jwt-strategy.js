const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: 'astroguruji'
};
console.log('hi inside jwt strategy');
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  console.log(jwtPayload._id);
  User.findById(jwtPayload._id)
    .then(user => {
      if (!user) {
        console.log('not login');
        return done(null, false);
      }
      console.log('login');
      return done(null, user);
    })
    .catch(err => {
      return done(err);
    });
}));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

module.exports = passport;
