const Artist = require('../models/Artist')


const createArtist = async (newArtist) => {
    console.log('debug')
    return new Promise(async (resolve, reject) => {

        const { name, image, country, description } = newArtist
        try {
            const createdArtist = await Artist.create({
                name,
                image,
                country,
                description
            })
            if (createdArtist)
            { 
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdArtist
            })
            }
        }

        catch (e) {
            reject(e)
        }
    })
}

const updateArtist = async (artistId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArtist = await Artist.findOne({
                _id: artistId
            })
            if (!checkArtist){
                resolve({
                    status: 'OK',
                    message: 'The artist is not defined.'
                })
            }
            const updatedArtist = await Artist.findByIdAndUpdate(artistId, data, {new: true})
            console.log('updateArtist', updatedArtist);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedArtist
            })
        }

        catch (e) {
            reject(e)
        }
    })
}
const deleteArtist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArtist = await Artist.findOne({
                _id: id
            })
            if (checkArtist === null) {
                resolve({
                    status: 'ERR',
                    message: 'The artist is not defined'
                })
            }

            await Artist.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete artist success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyArtist = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await Artist.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete artists success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsArtist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const artist = await Artist.findOne({
                _id: id
            })
            if (artist === null) {
                resolve({
                    status: 'ERR',
                    message: 'The artist is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: artist
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllArtist = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allArtist = await Artist.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allArtist
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createArtist,
    updateArtist,
    deleteArtist,
    deleteManyArtist,
    getDetailsArtist,
    getAllArtist
}