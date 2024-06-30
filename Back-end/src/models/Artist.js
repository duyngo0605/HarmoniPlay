const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {type: String, required: true},
  image: String,
  country: String,
  description: String,
  follower: {type: Number, default: 0},
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
