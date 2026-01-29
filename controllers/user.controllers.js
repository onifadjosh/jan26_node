const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt')
// const {z} = require("zod")

// const registerUserSchema = z.object({
//     name: z.string({required_error:"name is required"}).min(3),
//     username: z.string({required_error:"username is required"}).min(3),
//     email: z.string({required_error:"email is required"}).email("ivalid email format"),
//     password: z.string({required_error:"password is required"}).min(3),
  
// }).strict()

const registerUser=async(req, res)=>{

    const {name, username, password, email} = req.body
    // const registerUserr= registerUserSchema.parse(req.body)
    try {
    
        let saltRound = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, saltRound)
       let user = await UserModel.create({name, username, password:hashedPassword, email})
       res.status(201).send(
        {
            message:"user created successfully",
            data:{
              name,
               username,
               email,
               role:user?.role
            }
        }
       )
    } catch (error) {
        console.log(error);
        
        if(error.code== 11000){
            res.status(400).send({
                message:"User Already Exists"
            })
        }else{
            res.status(400).send({
                message:"error creating user"
            })
        }
    }
}


module.exports={
    registerUser
}

