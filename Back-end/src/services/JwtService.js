const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload,
    }, process.env.ACCESS_TOKEN, { expiresIn: '4h' })
    return access_token
}

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload,
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const decodeAccessToken = async (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        return decoded;
    } catch (error) {
        throw new Error(error);
    }
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService,
    decodeAccessToken
}