const express = require('express')
const router = express.Router()
const UserController = require('../contrllers/userController')

router.post('/signup', UserController.createUser)
router.post('/test', UserController.testController)

module.exports = router;