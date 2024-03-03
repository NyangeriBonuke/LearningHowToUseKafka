const createUserCase = require('../usecase/userUseCase')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

class UserController{
    async createUser(req, res){
        try{
            const {name, email, password} = req.body
            const savedUser = await createUserCase.signup(name, email, password)
            return res.status(201).json(savedUser)
        }
        catch(error){
            return res.status(500).json({ error: `Internal Server Error ${error}` })
        }
    }

    async loginUser(req, res){
        try{
            const {email, password} = req.body
            const userData = await createUserCase.login({email, password})

            await producer.send({
                topic: 'user-account-login',
                messages: [
                    { value: JSON.stringify(userData) }
                ]
            })

            return res.status(201).json(userData)
        }
        catch(error){
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    } 

    async passwordChange(req, res){
        try{
            const {email, oldPassword, newPassword} = req.body
            const result = await createUserCase.changePassword(email, newPassword, oldPassword)
            return res.status(201).json(result)
        }
        catch(error){
            return res.status(500).json({ error: 'Internal Server Error '})
        }
    }

    async testController(req, res){
        res.send('Working well')
    }
}

module.exports = new UserController