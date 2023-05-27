const router = require('express').Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

require('dotenv').config()
// router.get('/', (req, res)=>{

//     res.send('Welcome to fucking Auth Route');--> what is this badtameezzi
// })

// router.route('/').get((req, res)=>{
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.route('/register').get(async (req, res)=>{
    
//     const newUser = await new User({
//         userName: "roomi",
//         email: "abc@example.com",
//         password: "abc.123"

//     })
//     await newUser.save()
//     .then(users => res.json("User Added!"))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

//Create/Register a new User
router.route('/register').post(async (req, res) => {
const { userName, userEmail, userPassword } = req.body;
      try{
        // Create new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        // Create User
        // const newUser = await new User({
        //     userName: req.body.userName,
        //     userEmail: req.body.userEmail,
        //     userPassword: hashedPassword
        //   });

        //Destructured
        const newUser = await new User({
            userName,
            userEmail,
            userPassword: hashedPassword
          });

        //Save User
        const data = await newUser.save();
        res.status(200).json(data);
      }
        catch (err) {
         res.status(400).json('Error: ' + err);
        }
  });
  
//   router.route('/login').post(async (req, res) => {
//     try{
//         const userdata = await User.findOne({userEmail: req.body.userEmail})
//         !userdata && res.status(404).json("User Not Found!")
//         console.log(userdata)

//         const validPass = await bcrypt.compare(req.body.userPassword, userdata.userPassword)
//         !validPass && res.status(404).json("Incorrect Password")

//         res.json(userdata)
//     }
//     catch(err){
//         res.status(400).json('Error: ' + err);
//     }
//   });

//token does not contain sensitive info
//refresh token 

router.route('/login').post(async (req, res) => {
  const { userEmail, userPassword } = req.body;
  
    try {
      
      
      
      const userdata = await User.findOne({ userEmail: userEmail });
      if (!userdata) {
        return res.status(404).json("User Not Found!");
      }
  
      const validPass = await bcrypt.compare(userPassword.trim(), userdata.userPassword);
      if (!validPass) {
        return res.status(401).json("Incorrect Password");
      }
  
      // Password is correct, you can proceed with authentication or generating a token
  
      
      /////TOKEN GENERATION
      // const useremail = userEmail;
    const user = { email:userdata.userEmail,id:userdata._id }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // req.userId = accessToken.id;
    
    //res.json({ accessToken: accessToken })
    res.status(200).json(`Login Successful accesToken: ${accessToken}`);
          console.log("token signed");
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });
  


module.exports = router