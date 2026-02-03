const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    productName:{
        type:String, required:true
    },

    productPrice:{
        type:Number, required:true
    },

    productQuantity:{
        type:Number, required:true
    },

    productImage:{
        type:String, required:true
    },

    productDescription:{
        type:String, required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const ProductModel = mongoose.model("product", ProductSchema)


module.exports= ProductModel

