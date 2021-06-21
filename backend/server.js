const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const session = require('express-session')
//-------------------------END OF IMPORTS-----------------

const app = express()

const User = require('./user')
mongoose.connect(
  'mongodb+srv://nodemongo:admin@tilde.akhpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Mongoose Connected')
  }
)

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser('secretcode'))

app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

//-------------------------END OF MIDDLEWARE-----------------

//Routes
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.send('No user exists')
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send('Successfully Authed')
        console.log(req.user)
      })
    }
  })(req, res, next)
  console.log(req.body)
})
app.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err
    if (doc) res.send('User already exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      })
      await newUser.save()
      res.send('User created')
    }
  })
})
app.get('/user', (req, res) => {
  res.send(req.user) //User stored in the req.user, req object you get from client, has a user object inside it
  console.log(req.body)
})

//-------------------------END OF ROUTES---------------------

//Start Server
app.listen(7070, () => {
  console.log('Server started at 7070')
})
