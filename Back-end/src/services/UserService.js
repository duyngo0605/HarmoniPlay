const User = require('../models/User')
const Playlist = require('../models/Playlist')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken, decodeAccessToken } = require('./JwtService')
const Track = require('../models/Track')

const createUser = async (newUser) => {
    return new Promise(async (resolve, reject) => {

        const { username, email, password } = newUser

        try {
            const checkUser = await User.findOne({
                username: username
            })
    
            if (checkUser){
                resolve({
                    status: 'ERR',
                    message: 'The user was existed.'
                })
            }

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
                    status: 'ERR',
                    message: 'The user is not defined.'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);

            if (comparePassword)
            { 
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
    
                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
            })
            }
            else
            {
                resolve({
                    status: 'ERR',
                    message: 'The password is not correct.'
                })
            }
            
        }

        catch (e) {
            reject(e)
        }
    })
}

const updateUser = async (userId, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUser = await User.findOne({
                _id: userId
            })
            if (!checkUser){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined.'
                })
            }
            if (data.password)
            {
                const hash = bcrypt.hashSync(data.password, 10);
                data.password = hash;
            }
            if (data.addTrackToHistory) {
                await User.findByIdAndUpdate(
                    userId,
                    { $pull: { 'history': data.addTrackToHistory } },
                    { new: true }
                );
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            'history': {
                                $each: [data.addTrackToHistory],
                                $position: 0
                            }
                        }
                    },
                    { new: true }
                );
            }
            
            // Check if we need to add an artist to favorites
            if (data.addArtistToFavorites) {
                await User.findByIdAndUpdate(
                    userId,
                    { $push: { 'favorites.artists': data.addArtistToFavorites } },
                    { new: true }
                );
            }

            // Check if we need to remove an artist from favorites
            if (data.removeArtistFromFavorites) {
                await User.findByIdAndUpdate(
                    userId,
                    { $pull: { 'favorites.artists': data.removeArtistFromFavorites } },
                    { new: true }
                );
            }

            // Check if we need to add an track to favorites
            if (data.addTrackToFavorites) {
                await User.findByIdAndUpdate(
                    userId,
                    { $push: { 'favorites.tracks': data.addTrackToFavorites } },
                    { new: true }
                );
            }

            // Check if we need to remove an track from favorites
            if (data.removeTrackFromFavorites) {
                await User.findByIdAndUpdate(
                    userId,
                    { $pull: { 'favorites.tracks': data.removeTrackFromFavorites } },
                    { new: true }
                );
            }

            const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        }

        catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await Playlist.deleteMany({ creator: id });

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            ids.map(async (id) => {
                await deleteUser(id);
            })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteManyUser,
    getAllUser,
    getDetailsUser,
}