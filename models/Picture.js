
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  postID: {type: String, required: true},
  AuthorID: String,
  content: String,
  page: [{type: Schema.Types.ObjectId, ref: "Page"}]
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;