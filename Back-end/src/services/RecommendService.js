const Track = require('../models/Track');
const TFIDF = require('node-tfidf');

// Khởi tạo mô hình TF-IDF
const tfidf = new TFIDF();

let tracks = []

// Load dữ liệu từ cơ sở dữ liệu MongoDB và thêm vào mô hình TF-IDF
const loadTFIDFModel = async () => {
    tracks = await Track.find({}).sort({createdAt: 1});
    tracks.forEach(async track => {

        await track.populate([{path: 'genre'}, {path: 'artist'}]);
        const title=track.title;
        const genres = track.genre.map(genre => genre.name);
        const artists = track.artist.map(artist => artist.name);
        const combinedText = `${title} ${genres.join(' ')} ${artists.join(' ')}`;

        tfidf.addDocument(combinedText);
    });
};
// Load mô hình TF-IDF
loadTFIDFModel();


// Hàm recommendTracks để gợi ý bài hát
const recommendTracks = (trackId) => {
    return new Promise(async (resolve,reject) => {
        try {
            const checkTrack = await Track.findById(trackId).populate('genre').populate('artist');
    
            if (!checkTrack) {
                resolve({
                    status: 'ERR',
                    message: 'Track not found'
                });
            }
    
            const title=checkTrack.title;
            const genres = checkTrack.genre.map(genre => genre.name);
            const artists = checkTrack.artist.map(artist => artist.name);
            const query = `${title} ${genres.join(' ')} ${artists.join(' ')}`;
            const similarity = tfidf.tfidfs(query);

            const recommendedTracks = [];

            for (var i=0;i < tracks.length;i++)
            {
                recommendedTracks.push({track: tracks[i]._id, similarity: similarity[i]});
            }

            recommendedTracks.sort((a, b) => b.similarity - a.similarity);
            console.log(tfidf)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: recommendedTracks
            })
        } catch (e) {
            reject (e)
        }
    })
    
};

module.exports = {
    recommendTracks
}
