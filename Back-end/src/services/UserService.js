const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generalAccessToken } = require('./JwtService')

const createUser = async (newUser) => {
    return new Promise(async (resolve, reject) => {

        const { username, email, password, confirmPassword } = newUser
        try {
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                username,
                email,
                password: hash,
            })
            if (createdUser)
            { 
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdUser
            })
            }
        }

        catch (e) {
            reject(e)
        }
    })
}

const loginUser = async (loginModel) => {
    return new Promise(async (resolve, reject) => {

        const { username, password} = loginModel
        try {
            const checkUser = await User.findOne({
                username: username
            })

            if (!checkUser){
                resolve({
                    status: 'OK',
                    message: 'The user is not existed.'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            console.log(comparePassword);
            if (comparePassword)
            { 
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token
            })
            }
            else
            {
                resolve({
                    status: 'OK',
                    message: 'The password is not correct.'
                })
            }
            
        }

        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
}