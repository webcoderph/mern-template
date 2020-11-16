const express = require('express');
const db = require('../db')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    let result = await db.articles()
    res.json(result)   
  } catch (error) {
    console.log(error)
    res,sendStatus(500)
  }
})

module.exports = router