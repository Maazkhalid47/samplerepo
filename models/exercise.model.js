const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
    {
        userId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"

        }],
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
            max: 50
        },
        type:{
            type:String,
            required:true,

        },
        duration:{
            type:Number,
            required:true
        },
        dateCreated:{
            type:Date,
            default:Date.now()
        }

    }, 
    // {
    // timestamps: true
    // }
);

const exercise = mongoose.model('exercise' , exerciseSchema)
module.exports = exercise;