const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register=async(req,res,body)=>{
 
 // console.log(req.body);
 const {email, password } = req.body;

//  console.log(email,password);
 try {
   let user = await User.findOne({ email });
   if (user) {
     return res
       .status(400)
       .json({ errors: [{ msg: " User with that email already exists" }] });
   }
   // create new user
   user = new User({
     email,
     password,
   });
   // hash the password using gen salt
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);
   await user.save();
   // let saveUser = await user.save();
   return res.json({user});
 } catch (err) {
   console.error(err.message);
   return res.status(500).send("Server error");
 }

}