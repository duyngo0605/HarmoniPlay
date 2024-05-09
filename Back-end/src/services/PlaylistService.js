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
    console.log('debug')
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


module.exports = {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getDetailsPlaylist
}