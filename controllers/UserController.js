const {Doc,User}  =  require("../models/model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userController ={
    RegisterUser:async(req,res)=>{
        const {username,password,email,author,...prev} = req.body
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password,salt)
            
            const newUser = await new User({
                username:username,
                email:email,
                password:hashed,
                author:author,
                ...prev
            })
            //save db
            const user = await newUser.save()
            return res.status(200).json(user)

        } catch (error) {
            return  res.status(500).json(error)
        }
    },
    LoginUser:async(req,res)=>{
            try {
                const user = await User.findOne({username:req.body.username}).populate("docs")
                if(!user){
                    return res.status(404).json("wrong username")
                }
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                )
                if(!validPassword){
                    return res.status(404).json("wrong password")

                }
                if(user&&validPassword){
                    //tao jwt
                  const accessToken = jwt.sign({
                        id:user.id,
                        admin:user.isAdmin,

                    },
                    process.env.ACCCESS_TOKEN,
                    {expiresIn:"30d"});

                    const {password,...prev} =  user._doc
                    return res.status(200).json({...prev,accessToken})
                    
                }
            } catch (error) {
            return  res.status(500).json(error)
                
            }
    },
    LogoutUser:async (req,res)=>{
        try {
            res.status(200).json("logout success")
        } catch (error) {
            return res.status(400).json(error)
            
        }
    }
    ,
    GetAllUser: async (req,res)=>{
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    getAnUser:async(req,res)=>{
        try {
            const user = await User.findById(req.params.id).populate("docs");
            res.status(200).json(user)
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },
    UpdateUser:async (req,res)=>{
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({$set: req.body})
            res.status(200).json("updated success")
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },
    DeleteUser: async (req,res)=>{
        try {
            await Doc.updateMany({author:req.params.id},{author:null});
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted success")

        } catch (error) {
            return res.status(400).json(error)
            
        }
    }

}

module.exports = userController