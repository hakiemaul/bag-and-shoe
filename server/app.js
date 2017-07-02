const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const api = require('./routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000)