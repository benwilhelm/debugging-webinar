const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const db = require('./db')

// Holy cow, don't use this in production!
// It doesn't even check for a password!!
passport.use(new BasicStrategy(
  function(username, password, done) {
    const user = db.get('users').find({ email: username }).value()
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  }
));

module.exports = {
  middleware: {
    authenticateApi: passport.authenticate('basic', { session: false })
  }
}
