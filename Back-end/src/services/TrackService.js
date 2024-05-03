const Track = require("../models/Track")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre")
const ArtistService = require('../services/ArtistService')

const createTrack = async (newTrack) => {
    return new Promise(async (resolve, reject) => {

        try {

            const { title, artistIds, link, image, genreIds, releaseDate, duration } = newTrack;

            const artists = await Artist.find({_id: {$in: artistIds}})
            if (artists.length !== artistIds.length) {
                resolve({
                    status: 'ERR',
                    message: 'One ore more artists not found'
                })
            }
 
            const genres = await Genre.find({ _id: { $in: genreIds } });
            if (genres.length !== genreIds.length) {
                resolve({
                    status: 'ERR',
                    message: 'One ore more genres not found'
                })
            }
    
            const createdTrack = await Track.create({
                title,
                artist: artistIds,
                link,
                image,
                genre: genreIds,
                releaseDate,
                duration
            });

            if (createdTrack)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdTrack
                })
            }
    
            artists.forEach(async (artist) => {
                artist.tracks.push(createdTrack._id);
                await artist.save()
            })
        }

        catch (e) {
            reject(e)
        }
    })
        
};

const updateTrack = async (trackId, data) => {
    return new Promise(async (resolve,reject) => {

        try {

            const checkTrack = await Track.findById(trackId)
            if (!checkTrack)
            {
                resolve({
                    status: 'ERR',
                    message: 'Track not found'
                })
            }

 

            if (data.artistIds)
            {
                const lastArtists = await Artist.find({_id: {$in: checkTrack.artist}})
                const currArtists = await Artist.find({_id: {$in: data.artistIds}})
                lastArtists.forEach(async (artist) => {
                    artist.tracks.pull(trackId)
                    await artist.save()
                })
                currArtists.forEach(async (artist) => {
                    artist.tracks.push(trackId)
                    await artist.save()
                })
            }
            
            const updatedTrack = await Track.findByIdAndUpdate(trackId, {
                ...data,
                artist: data.artistIds,
                genre: data.genreIds,
            }, {new: true})
            console.log(data)

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedTrack
            })
            
        }

        catch (e)
        {
            reject(e)
        }
    })
}


const deleteTrack = async (trackId) => {
    return new Promise(async (resolve,reject) => {

        try {

            const checkTrack = await Track.findById(trackId)
            if (!checkTrack)
            {
                resolve({
                    status: 'ERR',
                    message: 'Track not found'
                })
            }

            const artists = await Artist.find({_id: {$in: checkTrack.artist}})
            artists.forEach(async (artist) => {
                artist.tracks.pull(trackId)
                await artist.save();
            })
            await Track.findByIdAndDelete(trackId)

            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
            
        }

        catch (e)
        {
            reject(e)
        }
    })
}

const getDetailsTrack = async (trackId) => {
    return new Promise(async (resolve,reject) => {

        try {

            const checkTrack = await Track.findById(trackId)
            if (!checkTrack)
            {
                resolve({
                    status: 'ERR',
                    message: 'Track not found'
                })
            }

            const track = await Track.findById(trackId)

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: track
            })
            
        }

        catch (e)
        {
            reject(e)
        }
    })
}


module.exports = {
    createTrack,
    updateTrack,
    deleteTrack,
    getDetailsTrack
}