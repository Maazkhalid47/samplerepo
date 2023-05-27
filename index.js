const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
jsonwebtoken = require("jsonwebtoken");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();


//Connecting to MongoDb (returns a promise use .then or asyn/await)
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


var corsOptions = {
  origin: "http://127.0.0.1:5173"
};

app.use(cors(corsOptions));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


app.get('/',(req,res)=>{
    res.send("Welcome to HomePage");
})


// app.get('/users',(req,res)=>{
//     res.send("Welcome to Users Page");
// })



app.listen(port,() =>{
    console.log(`server is running on ${port}`)
})