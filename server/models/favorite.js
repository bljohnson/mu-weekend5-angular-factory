var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FavoriteSchema = new Schema({
  petName: {type: String, required: true},
  petfinderID: {type: String},
  petImageURL: {type: String},
  description: {type: String}
});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
