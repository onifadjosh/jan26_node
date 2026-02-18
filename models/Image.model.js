const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    publicId:{type:String, required:true},
    link:{type:String, required:true},
}, {timestamps:true, strict:"throw"})


const ImageModel = mongoose.model('image', ImageSchema)


module.exports = ImageModel