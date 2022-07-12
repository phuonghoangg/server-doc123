const mongoose = require ('mongoose')

const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        required:true,
        default:"",
        unique:true,
    },
    email:{
        type:String,
        default:"",
    },
    author:{
        type:String,
        default:"",
    },
    password:{
        type:String,
        required:true,
        default:"",
    },
    year:{
        type:Number,
        default:0
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    imageURL:{
        type:String,
       
        default:"",
    },

    docs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doc",
        }
    ]

},{timestamps:true})

const docSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:"",
    },
    genres:{
        type: String,
        default:"",
    },
    image:{
        type: String,
        default:"",
    },
    description:{
        type: String,
        default:"",
    },
    dataPDF:{
        type: String,
        default:"",
    },
    viewer:{
        type:Number,
        default:0,
    },
    pages:{
        type:Number,
        default:0,
    },
    downloand:{
        type:Number,
        default:0,
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

let Doc = mongoose.model("Doc",docSchema)
let User = mongoose.model("User",userSchema)

module.exports = {Doc,User}