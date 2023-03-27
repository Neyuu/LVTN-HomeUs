const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  idAdmin: {
    type: Boolean
  },
  isBooker: {
    type: Boolean
  },
  acceptBooker: {
    type: Boolean,
  },
  balanceCoin: {
    type: Number
  },
  avatar: {
    type: String
  },
  img: [String],
  listProject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  address: String,
  phone: String,
  cmnd: String,
  issuedBy: String,
  dateEx: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;