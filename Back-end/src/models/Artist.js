const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {type: String, required: true},
  image: String,
  country: String,
  description: String,
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
