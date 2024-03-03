const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Notification')
})

app.listen('8002', () => {
    console.log('Service started on port 8002')
})