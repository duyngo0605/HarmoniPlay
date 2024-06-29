const Genre = require('../models/Genre')
const Track = require('../models/Track')

const createGenre = async (newGenre) => {
    return new Promise(async (resolve, reject) => {

        const { name } = newGenre
        try {
            const createdGenre = await Genre.create({
                name
            })
            if (createdGenre)
            { 
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdGenre
            })
            }
        }

        catch (e) {
            reject(e)
        }
    })
}

const updateGenre = async (genreId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkGenre = await Genre.findOne({
                _id: genreId
            })
            if (!checkGenre){
                resolve({
                    status: 'OK',
                    message: 'The Genre is not defined.'
                })
            }
            const updatedGenre = await Genre.findByIdAndUpdate(genreId, data, {new: true})
            console.log('updateGenre', updatedGenre);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedGenre
            })
        }

        catch (e) {
            reject(e)
        }
    })
}
const deleteGenre = (id) => {
    return new Promise(async (resolve, reject) => {
        console.log('debug')
        try {
            const checkGenre = await Genre.findOne({
                _id: id
            })
            if (checkGenre === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Genre is not defined'
                })
            }

            const checkTrack = await Track.findOne({ genre: { $in: [id] } });
            if (checkTrack)
                resolve({
                    status: 'ERR',
                    message: 'The Genre is used by a track'
                })
            else {

            await Genre.findByIdAndDelete(id)

            console.log('deleted')

            resolve({
                status: 'OK',
                message: 'Delete genre success',
            })}
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyGenre = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTrack = await Track.findOne({ genre: { $in: ids } });
            if (checkTrack)
                resolve({
                    status: 'ERR',
                    message: 'The Genre is used by a track'
                })
            else {
            await Genre.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete Genre success',
            })}
        } catch (e) {
            reject(e)
        }
    })
}

const getAllGenre = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allGenre = await Genre.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allGenre
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsGenre = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const genre = await Genre.findById(id)

            if (!genre)
            {
                resolve({
                    status: 'ERR',
                    message: 'Genre not defined'
                })
            }
            
            resolve({
                status: 'OK',
                message: 'Success',
                data: genre
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createGenre,
    updateGenre,
    deleteGenre,
    deleteManyGenre,
    getAllGenre,
    getDetailsGenre
}