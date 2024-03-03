const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/userRoute')

mongoose.connect('mongodb://127.0.0.1:27017/nodeauth')
.then(() => {
    console.log('Connected to mongodb')
})
.catch((error) => {
    console.log(error)
    process.exit(1)
})

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen('8001', () => {
    console.log("Service started on port 8001")
})