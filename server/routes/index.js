const express = require('express')
const router = express.Router()

const userctrl = require('../controllers/userctrl')

router.get('/api/users', userctrl.get)
router.post('/api/users', userctrl.signup)
router.post('/api/users/login', userctrl.login)
router.put('/api/users/:id', userctrl.update)
router.delete('/api/users/:id', userctrl.remove)

module.exports = router