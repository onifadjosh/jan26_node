const UserModel = require("../models/user.model");

const registerUser=async(req, res)=>{
    const {name, username, password, email} = req.body
    try {
       let user = await UserModel.create(req.body)
       res.status(201).send(
        {
            message:"user created successfully",
            data:{
                
            }
        }
       )
    } catch (error) {
        
    }
}


module.exports={
    registerUser
}

