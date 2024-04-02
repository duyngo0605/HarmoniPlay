const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {type: String, required: true},
  artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  album: String,
  genre: [{type: Schema.Types.ObjectId, ref: 'Gerne'}],
  releaseDate: Date,
  duration: Number,
  timestamps: true,
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
