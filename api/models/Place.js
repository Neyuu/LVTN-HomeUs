const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  price: Number,
  status: Boolean,
  memberStatus: Boolean,
  packageLong: {
      longPackageDate: String,
      price: Number
  },
  packageShort: {
      shortPackageDateStart: String,
      shortPackageDateEnd: String,
      price: Number
  },
  personBooker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [
    {
      idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      date: {type: Date, default: Date.now}
    }
  ]
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;