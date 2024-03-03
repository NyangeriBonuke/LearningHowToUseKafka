const User = require('../models/userModel')

class createUserCase{
    async signup(userData){
        try{
            const newUser = new User(userData)
            const savedUser = await newUser.save()
            return savedUser
        }
        catch(error){
            throw new Error(`Failed to create user ${error}`)
        }
    }

    async login(email, password){
        try{
            const user = await User.findOne({ email })
            if(!user){
                throw new Error('User not found')
            }
            const isValidPassword = await User.comparePassword(password)
            if(!isValidPassword){
                throw new Error('Invalid password')
            }

            return{
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
        catch(error){
            throw new Error('Failed to login')
        }
    }

    async changePassword(email, oldPassword, newPassword){
        try{
            const user = await User.findOne({ email })
            if(!user){
                throw new Error('User not found')
            }
            const isValidPassword = await User.comparePassword(oldPassword)
            if(!isValidPassword){
                throw new Error('Password not found')
            }
            user.newPassword = newPassword
            await user.save()
            return { message: 'Password changed successfully'}
        }
        catch(error){
            throw new Error('Failed to change password')
        }
    }
}

module.exports = new createUserCase()