const Playlist = require("../models/Playlist")
const Track = require("../models/Track")

const createPlaylist = async (playlist, creator) => {
    return new Promise(async (resolve, reject) => {

        try {

            const { title, description, trackIds} = playlist;

            const tracks = await Track.find({ _id: { $in: trackIds } });
            if (tracks.length !== trackIds.length) {
                resolve({
                    status: 'ERR',
                    message: 'One ore more tracks not found'
                })
            }
    
            const createdPlaylist = await Playlist.create({
                title,
                creator: creator,
                description,
                tracks: trackIds
            });

            if (createdPlaylist)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdPlaylist
                })
            }
        }

        catch (e) {
            reject(e)
        }
    })
        
};

const updatePlaylist = async (data, id, updater) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { title, description, removedTrackIds, addedTrackIds } = data;

            const checkPlaylist = await Playlist.findById(id);

            if (!checkPlaylist) {
                resolve({
                    status: 'ERR',
                    message: 'Playlist not found'
                })
            }

            if (checkPlaylist.creator != updater)
            {
                resolve({
                    status: 'ERR',
                    message: 'The updater must be the creator'
                })
            }

            const updatedTracks = checkPlaylist.tracks;

            if (removedTrackIds && removedTrackIds.length > 0) {
                removedTrackIds.forEach(trackId => {
                    updatedTracks.pull(trackId)
                });
            }

            if (addedTrackIds && addedTrackIds.length > 0) {
                addedTrackIds.forEach(trackId =>  {
                    const existingTrackIndex = updatedTracks.findIndex(track => track._id === trackId);
                    console.log(updatedTracks.findIndex(track => track._id === trackId))
                })
            }

            const updatedPlaylist  = await Playlist.findByIdAndUpdate(id, {
                ...data,
                tracks: updatedTracks,
            }, {new: true})

            resolve({
                status: "OK",
                message: "Updated successfully",
                data: updatedPlaylist
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            reject(error);
        }
    });
};

const deletePlaylist = async (id, user) => {
    return new Promise(async (resolve, reject) => {
        try {

            
            const checkPlaylist = await Playlist.findById(id);


            if (!checkPlaylist) {
                resolve({
                    status: 'ERR',
                    message: 'Playlist not found'
                })
            }

            
            if (!user.isAdmin && user.id != checkPlaylist.creator){
                resolve({
                    status: 'ERR',
                    message: 'User must be creator or admin'
                })
            }

            await Playlist.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "Deleted successfully"
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            reject(error);
        }
    });
};


const getDetailsPlaylist = async (playlistId) => {
    return new Promise(async (resolve,reject) => {

        try {

            const checkPlaylist = await Playlist.findById(playlistId)
            if (!checkPlaylist)
            {
                resolve({
                    status: 'ERR',
                    message: 'Platlist not found'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: checkPlaylist
            })
            
        }

        catch (e)
        {
            reject(e)
        }
    })
}

const getAllPlaylist = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        const totalPlaylist = await Playlist.countDocuments();
        let allPlaylist = [];
        if (filter) {
          const label = filter[0];
          const allObjectFilter = await Playlist.find({
            [label]: { $regex: filter[1] },
          }).populate([{path: 'creator'}])
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 });
          resolve({
            status: "OK",
            message: "Success",
            data: allObjectFilter,
            total: totalPlaylist,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalPlaylist / limit),
          });
        }
        if (sort) {
          const objectSort = {};
          objectSort[sort[1]] = sort[0];
          const allPlatlistSort = await Playlist.find()
            .limit(limit)
            .skip(page * limit)
            .sort(objectSort)
            .sort({ createdAt: -1, updatedAt: -1 }).populate([{path: 'creator'}]);
          resolve({
            status: "OK",
            message: "Success",
            data: allPlatlistSort,
            total: totalPlaylist,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalPlaylist / limit),
          });
        }
        if (!limit) {
          allPlaylist = await Playlist.find().sort({
            createdAt: -1,
            updatedAt: -1,
          }).populate([{path: 'creator'}]);
        } else {
            allPlaylist = await Playlist.find()
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1 }).populate([{path: 'creator'}]);
        }
        resolve({
          status: "OK",
          message: "Success",
          data: allPlaylist,
          total: totalPlaylist,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalPlaylist / limit),
        });
      } catch (e) {
        reject(e);
      }
    });
  };

module.exports = {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getDetailsPlaylist,
    getAllPlaylist
}