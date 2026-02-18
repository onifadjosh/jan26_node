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
        url:{type:String, required:true},
        public_id:{type:String, required:true},
    },

    productDescription:{
        type:String, required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const ProductModel = mongoose.model("product", ProductSchema)


module.exports= ProductModel

