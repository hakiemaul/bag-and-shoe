const express = require('express')
const router = express.Router()

const userctrl = require('../controllers/userctrl')
const transactionctrl = require('../controllers/transactionctrl')

router.get('/api/users', userctrl.get)
router.post('/api/users', userctrl.signup)
router.post('/api/users/login', userctrl.login)
router.put('/api/users/:id', userctrl.update)
router.delete('/api/users/:id', userctrl.remove)

router.get('/api/transactions', transactionctrl.get)
router.post('/api/transactions', transactionctrl.create)
router.get('/api/transactions/:id', transactionctrl.getOne)
router.put('/api/transactions/:id', transactionctrl.update)
router.put('/api/transactions/:id/complete', transactionctrl.completed)
router.delete('/api/transactions/:id', transactionctrl.remove)

module.exports = router