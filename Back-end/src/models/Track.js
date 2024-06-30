const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    title: {type: String, required: true},
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    link: {type: String, required: true},
    image: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    releaseDate: Date,
    duration: Number,
    likes: {type: Number, default: 0},
    plays: {type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
