const Artist = require('../models/Artist')
const Track = require('../models/Track')


const createArtist = async (newArtist) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, country, description } = newArtist
        try {
            const createdArtist = await Artist.create({
                name: name,
                image: image,
                country: country,
                description: description
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
    console.log(artistId, data)
    return new Promise(async (resolve, reject) => {
        try {
            const checkArtist = await Artist.findOne({
                _id: artistId
            })
            var follower = checkArtist.follower;
            if (data?.isFollowed == true)
            {
                follower++;
            }
            else if (data?.isUnFollowed == true){
                follower--;
            }
            if (!checkArtist){
                resolve({
                    status: 'OK',
                    message: 'The artist is not defined.'
                })
            }
            const updatedArtist = await Artist.findByIdAndUpdate(artistId, 
                {
                    ...data,
                    follower: follower
                }, {new: true})
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
            const checkTrack = await Track.findOne({ artist: { $in: [id] } });
            if (checkTrack)
                resolve({
                    status: 'ERR',
                    message: 'Could not delete becasue there are tracks owned by this artist'
                })
            else {

            await Artist.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete artist success',
            })}
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyArtist = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('delete many')
            const checkTrack = await Track.findOne({ artist: { $in: ids } });
            if (checkTrack)
                resolve({
                    status: 'ERR',
                    message: 'Could not delete becasue there are tracks owned by one of these artists'
                })
            else {

            await Artist.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete artists success',
            })}
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

const getAllArtist = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        const totalArtist = await Artist.countDocuments();
        let allArtist = [];
        if (filter) {
          const label = filter[0];
          const allObjectFilter = await Artist.find({
            [label]: { $regex: filter[1] },
          })
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 });
          resolve({
            status: "OK",
            message: "Success",
            data: allObjectFilter,
            total: totalArtist,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalArtist / limit),
          });
        }
        if (sort) {
          const objectSort = {};
          objectSort[sort[1]] = sort[0];
          const allPlatlistSort = await Artist.find()
            .limit(limit)
            .skip(page * limit)
            .sort(objectSort)
            .sort({ createdAt: -1, updatedAt: -1 });
          resolve({
            status: "OK",
            message: "Success",
            data: allPlatlistSort,
            total: totalArtist,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalArtist / limit),
          });
        }
        if (!limit) {
          allArtist = await Artist.find().sort({
            createdAt: -1,
            updatedAt: -1,
          });
        } else {
            allArtist = await Artist.find()
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 });
        }
        resolve({
          status: "OK",
          message: "Success",
          data: allArtist,
          total: totalArtist,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalArtist / limit),
        });
      } catch (e) {
        reject(e);
      }
    });
  };



module.exports = {
    createArtist,
    updateArtist,
    deleteArtist,
    deleteManyArtist,
    getDetailsArtist,
    getAllArtist
}