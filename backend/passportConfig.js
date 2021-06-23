const User = require("./user")
const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err
        if (!user) return done(null, false) //error:null  user:false, hata yok, kullanici yok
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user) //hata yok, kullanici var
          } else {
            return done(null, false)
          }
        })
      })
    })
  )

  //stores a cookie inside a browser with an id
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
  //takes that cookie and unravels it and returns a user
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user)
    })
  })
}
