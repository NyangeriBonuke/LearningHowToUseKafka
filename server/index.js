const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', proxy('http://localhost:8001'))
app.use('/auth/login', proxy('http://localhost:8001/auth/login'))

app.use('/notification', proxy('http://localhost:8002'))

app.listen('8000', () => {
    console.log("Api gateway on port 8000")
})