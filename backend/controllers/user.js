
import { jwt_secret } from '../config/config.js';
import JWT from "jsonwebtoken"
import User from '../models/user.js';

export const registerUser = async (req, res) => {

  try {
    

    const { email, userName, password } = req.body;
    console.log("success",userName)
    const isUserExist = await User.findOne({
      $or: [
        { email: email.toLowerCase() }, // Add parentheses after toLowerCase
        { userName: userName.toLowerCase() }, // Add parentheses after toLowerCase
      ],

    });


    if (isUserExist) {
      return res.status(400).send("email or username already exists");
    }

    
    const userInfo = new User({
      email: email.toLowerCase(), 
      userName: userName.toLowerCase(), 
      password: password,
    });

    await userInfo.save();

    res.status(201).send(userInfo);
  } catch (error) {
    console.log("error at register", error);
    res.status(500).send("something went wrong");
  
  }
};


export const loginUser = async(req, res)=>{
  try {
    const {email ,password} =req.body;

    const isUserExist = await User.findOne({email :email.toLowerCase(),
   }).select("+password");
   

 
    if(!isUserExist){
      return res.status(400).send("Invalid Email")

    }


    const isPasswordCorrect = await isUserExist.comparePassword(password);

  
    if(!isPasswordCorrect){
      return res.status(400).send("Incorrect Password")

    }
   
// Token generation
const expiresIn = 7 * 24 * 60 * 60; // 7 days
const token = JWT.sign(
  { id: isUserExist._id },
   jwt_secret, // Make sure to use your JWT secret from environment variables
  { expiresIn }
);

// Set the token as a cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: false, // Set to true if using HTTPS
  maxAge: expiresIn * 1000 // Max age in milliseconds
});

// Remove the password from the user object before sending it
isUserExist.password = undefined;

// Send response with user data and token expiration time
res.status(201).send({ ...isUserExist.toJSON(), expiresIn });
    
  } catch (err) {
    console.log("error at loginUser",err);
    res.status(400).send(err.meassage)
    
  }
}

