const mongoose = require('mongoose');
const {Schema} = mongoose;

const InvoiceSchema = new Schema({
  name: String,
    idUser: String,
    coin: String,
    note: String,
    status: String,
    type: String,
}, {
  timestamps: true
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

module.exports = InvoiceModel;