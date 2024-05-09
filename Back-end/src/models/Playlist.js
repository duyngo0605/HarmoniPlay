const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: {type: String, required: true},
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
},
{
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
