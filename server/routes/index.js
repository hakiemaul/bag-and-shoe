const express = require('express')
const router = express.Router()

const userctrl = require('../controllers/userctrl')

router.get('/api/users', userctrl.get)

module.exports = router