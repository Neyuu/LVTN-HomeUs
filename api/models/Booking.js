const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  userMain:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  booker: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
  checkIn: {type:Date},
  checkOut: {type:Date},
  typeOption: {type:String}, 
  numberOfNights: {type:String}, 
  status: {type:String}, 
  price: Number,
  service: [String],
  reviews: [
    {
      idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      date: {type: Date, default: Date.now}
    }
  ]

});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;


