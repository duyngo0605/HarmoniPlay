const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: String,
  email: {type: String, required: true, unique: true},
  isAdmin: {type: Boolean, default: false, required: true},
  profile: {
    fullname: String,
    avatar: String
  },
  favorites: {
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }]
  },
  history: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
