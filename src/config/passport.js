const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');
const User2 = require('../app/models/banco');

module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  

  // Signup
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'the email is already taken'));
      } else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.nombre = req.param('name')
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser);
        });
      }
    });
  }));

////////

  passport.serializeUser(function (banco, done) {
    done(null, banco.id);
  });

  passport.deserializeUser(function (id, done) {
    User2.findById(id, function (err, banco) {
      done(err, banco);
    });
  });

  passport.use('local-adtarge', new LocalStrategy({
    usernameField: 'targe',
    passwordField: 'money',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function (req, targe, money, done) {
    User2.findOne({'target.targeta': targe}, function (err, banco) {
      if (err) {
        return done(err);
      }
      if (banco) {
        return done(null, false, req.flash('adtargeMessage', 'the targe is already taken'));
      } else {
        console.log(targe + money)
        var newUser2 = new User2();
        newUser2.target.targeta = targe;
        newUser.targeta.email = "asdasd";
        newUser2.target.numero = money;
        newUser2.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser2);
        });
      }
    });
  }));


  // login
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No User found'))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong. password'));
      }
      return done(null, user);
    });
  }));
}

