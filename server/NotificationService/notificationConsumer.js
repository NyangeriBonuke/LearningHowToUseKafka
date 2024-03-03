const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'notification-group' })

const initConsumer = async() => {
    try{
        await consumer.connect()
        await consumer.subscribe({ topic: 'user-account-created' })
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log(`Recieved message: ${message.value.toString()}`)
            }
        })
    }
    catch(error){
        console.log('Error consuming the messages')
    }
}

initConsumer()