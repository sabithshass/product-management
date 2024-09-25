const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  variants:[{ type:  mongoose.Schema.Types.Mixed, required: true }], 
  description: { type: String, required: true }, 
  image: { type: String }
},
{ versionKey: false, timestamps: true });

module.exports = mongoose.model('Product', productSchema);
