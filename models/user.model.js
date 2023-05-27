const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            trim: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
            // match: /^[a-zA-Z0-9]+$/,
            // index: true,
        },
        userEmail:{
            type:String,
            required:true,
            trim: true,
            unique: true,
            //match: /^[a-zA-Z0-9]+$/,
            //max: 50,
        },
        userPassword:{
            type:String,
            required:true,
            minlength: 6,
            // match: /^[a-zA-Z0-9]+$/,
            // index: true,

        }


    }, 
    {
    timestamps: true
    }
);

const User = mongoose.model('User' , userSchema)
module.exports = User;