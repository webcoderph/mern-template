const express = require('express');
const db = require('../controllers/accounts')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = 10
const Account = require('../model/Account')

router.get('/', async (req, res, next) => {
  try {
    await Account.find({}, (err, result) => {
      if(err) {
        res.send(err)
      }

      res.json(result)
    })
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
  
  const params = {
    username: await req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    email: await req.body.email
  } 
  
  try {
    let result = await db.addAccount(params)
    res.json(result)
  } catch(error) {
    console.log(error)
    res.json(error)
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


router.get('/accounts/test', async (req, res, next) => {
  // const account = new AccountModel({
  //   username: 'katkat',
  //   email: 'kat@webcoderph.com',
  //   password: '123456',
  //   balance: 250.30
  // })
  try {
    let result = await AccountModel.find()
    await console.log(result[1].balance.$numberDecimal)
    res.json(result[1].balance)
    
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  } 
})

module.exports = router