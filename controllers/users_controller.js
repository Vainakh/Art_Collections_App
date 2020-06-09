const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')


users.get('/new', (req, res) => {
  
  res.render('new.ejs')
})

users.post('/register', (req, res) => {
  console.log(req);
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    req.session.isLoggedIn = true;
    console.log('user is created', req.body.username)
    
    res.render('home.ejs', 
      {
        user: req.body.username,
        currentUser: false
      }
    )
  })
})

users.get('/log')

module.exports = users