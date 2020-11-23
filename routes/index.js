const express = require('express');
const db = require('../db')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = 10

router.get('/', async (req, res, next) => {
  try {
    let result = await db.articles()
    res.json(result)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/accounts/login', async (req, res, next) => {
  try {
    let result = await db.findUsername(req.body.username)
    if(result === null) {
      return res.status(400).send('Invalid Username or Password!')
    }
    let current_password = result.rows[0].password
    if(await bcrypt.compare(req.body.password, current_password)) {
      return res.json(result.rows[0])
    } else {
      return res.sendStatus(400).end('Invalid username or password')
    }
  } catch(error) {
    console.log(error)
  }
})

router.post('/accounts/register',  async (req, res, next) => {
  let user = {
    username: await req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    email: await req.body.email
  }

  try {
    let result = await db.addAccount(user)
    res.json(result)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/accounts/update', async (req, res, next) => {
  try {
    let result = await db.updateBalance(req.body)
    res.json(result)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router