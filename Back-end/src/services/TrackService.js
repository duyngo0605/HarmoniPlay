const Track = require("../models/Track")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre");

const createTrack = async (newTrack) => {
    return new Promise(async (resolve, reject) => {

        try {

            const { title, artist, link, image, genre, releaseDate, duration } = newTrack;

            const artists = await Artist.find({_id: {$in: artist}})
            if (artists.length !== artist.length) {
                resolve({
                    status: 'ERR',
                    message: 'One ore more artists not found'
                })
            }
            
            const genres = await Genre.find({ _id: { $in: genre } });
            if (genres.length !== genre.length) {
                resolve({
                    status: 'ERR',
                    message: 'One ore more genres not found'
                })
            }
    
            const createdTrack = await Track.create({
                title,
                artist: artist,
                link,
                image,
                genre: genre,
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
            var currPlay = checkTrack.plays;
            var currLike = checkTrack.likes;
            if(data?.play == true)
            {
                currPlay++;
            }
            if(data?.like == true)
            {
                currLike++;
            }
            else if (data?.unlike == true)
            {
                if (currLike > 0)
                    currLike--;
            }

            if (data.artist)
            {
                const lastArtists = await Artist.find({_id: {$in: checkTrack.artist}})
                const currArtists = await Artist.find({_id: {$in: data.artist}})
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
                plays: currPlay,
                likes: currLike,
                artist: data.artist,
                genre: data.genre,
            }, {new: true})
            console.log(updatedTrack)

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


const deleteManyTrack = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            ids.map(async (id) => {
                await deleteTrack(id);
            })
            resolve({
                status: 'OK',
                message: 'Delete tracks success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsTrack = async (trackId) => {
    return new Promise(async (resolve,reject) => {

        try {

            const checkTrack = await Track.findById(trackId).populate([{path: 'genre'}, {path: 'artist'}])
            if (!checkTrack)
            {
                resolve({
                    status: 'ERR',
                    message: 'Track not found'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: checkTrack
            })
            
        }

        catch (e)
        {
            reject(e)
        }
    })
}

const getAllTrack = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
      try {

        const totalTrack = await Track.countDocuments();
        let allTrack = [];

        if (filter) {
          const label = filter[0];
          const allObjectFilter = await Track.find({
            [label]: { $regex: filter[1] },
          }).populate([{path: 'genre'}, {path: 'artist'}])
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 });
          resolve({
            status: "OK",
            message: "Success",
            data: allObjectFilter,
            total: totalTrack,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalTrack / limit),
          });
        }
        if (sort) {
          const objectSort = {};
          objectSort[sort[1]] = sort[0];
          const allPlatlistSort = await Track.find()
            .limit(limit)
            .skip(page * limit)
            .sort(objectSort)
            .sort({ createdAt: -1, updatedAt: -1 }).populate([{path: 'genre'}, {path: 'artist'}]);
          resolve({
            status: "OK",
            message: "Success",
            data: allPlatlistSort,
            total: totalTrack,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalTrack / limit),
          });
        }
        if (!limit) {
          allTrack = await Track.find().sort({
            createdAt: -1,
            updatedAt: -1,
          }).populate([{path: 'genre'}, {path: 'artist'}]);
        } else {

            allTrack = await Track.find()
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 }).populate([{path: 'genre'}, {path: 'artist'}]);
        }
        resolve({
          status: "OK",
          message: "Success",
          data: allTrack,
          total: totalTrack,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalTrack / limit),
        });
      } catch (e) {
        reject(e);
      }
    });
  };

module.exports = {
    createTrack,
    updateTrack,
    deleteTrack,
    deleteManyTrack,
    getDetailsTrack,
    getAllTrack
}