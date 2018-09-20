
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const pageSchema = new Schema({
  userID: {type: String, required: true},
  content: String,
  comments: String,
  imgName:String,
  imgPath:String,
  picture: [{type: Schema.Types.ObjectId, ref: "Picture"}]
});
const Page = mongoose.model("Page", pageSchema);
module.exports = Page;

