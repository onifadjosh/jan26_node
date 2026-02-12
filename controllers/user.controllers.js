const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { renderTemplate } = require("../middleware/mail.sender");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASS
  }
});
// const {z} = require("zod")

// const registerUserSchema = z.object({
//     name: z.string({required_error:"name is required"}).min(3),
//     username: z.string({required_error:"username is required"}).min(3),
//     email: z.string({required_error:"email is required"}).email("ivalid email format"),
//     password: z.string({required_error:"password is required"}).min(3),

// }).strict()

const registerUser = async (req, res) => {
  const { name, username, password, email } = req.body;
  // const registerUserr= registerUserSchema.parse(req.body)
  try {
    let saltRound = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, saltRound);
    let user = await UserModel.create({
      name,
      username,
      password: hashedPassword,
      email,
    });
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    console.log(token);

    const mailContent = await renderTemplate('welcomeMail.ejs', {name, companyName:"Himer Stores"})

    res.status(201).send({
      message: "user created successfully",
      data: {
        name,
        username,
        email,
        role: user?.role,
      },
      token,
    });

    let mailOptions = {
      from: process.env.APP_MAIL,
      to:process.env.APP_MAIL,
      bcc: ['oluwafemiajayi103@gmail.com', 'charliemoss008@gmail.com', process.env.APP_MAIL],
      subject: `Welcome ${name}`,
      html:mailContent
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

   
  } catch (error) {
    console.log(error);

    if (error.code == 11000) {
      res.status(400).send({
        message: "User Already Exists",
      });
    } else {
      res.status(400).send({
        message: "error creating user",
      });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).send({
        message: "Invalid account details",
      });
      return;
    }
    console.log(user);
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).send({
        message: "Invalid account details",
      });
      return;
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(200).send({
      message: "user logged in successfully",
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user?.roles,
        token,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Invalid account details",
    });
  }
};

const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization.split(" ")[0];

  if (!token) {
    res.status(401).send({
      message: "unauthorized request",
    });
    return;
  }

  const decodedUser = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        res.status(401).send({
          message: "unauthorized request",
        });
        return;
      }

      console.log(decoded);
      //  decoded.id;

      req.user = decoded.id;
      // {id:""}

      next();
    }
  );
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  // req.user

  try {
    const user = await UserModel.findById(req.user);
    if (!user) {
      res.status(404).send({
        message: "user not found",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).send({
        message: "Details not correct",
      });
      return;
    }

    const salt = 10;
    const saltround = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(newPassword, saltround);
    const newUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).send({
      message: "password updated successfully!",
    });

    //collect password and compare
    //collect newpass and encrypt
    //then send all
  } catch (error) {
    console.log(error);
    
    res.status(404).send({
      message: "Error changing password",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyAuth,
  changePassword,
};
