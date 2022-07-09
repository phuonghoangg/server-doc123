const {Doc,User}  =  require("../models/model")

const docController = {
    AddDoc:async(req,res)=>{
        try {
            const newDoc = await new Doc(req.body)
            const doc = await newDoc.save()
            if(req.body.author){
                const user = await User.findById(req.body.author)
                await user.updateOne({$push:{docs:doc._id}})
            }

             return  res.status(200).json(doc)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    GetAllDoc:async (req,res)=>{
        try {
            const allDoc = await Doc.find().populate("author","author")
            res.status(200).json(allDoc)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    GetADoc:async(req,res)=>{
        try {
            const   doc = await Doc.findById(req.params.id).populate("author","author")
            res.status(200).json(doc)

        } catch (error) {
            return res.status(500).json(error)
            
        }
    },
    UpdateDoc:async (req,res)=>{
        try {
            const doc = await Doc.findById(req.params.id);
            await doc.updateOne({$set: req.body})
            res.status(200).json("updated success")
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },
    DeleteDoc:async(req,res)=>{
        try {
            await User.updateMany({books:req.params.id},{$pull : {books:req.params.id}})
            await Doc.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted success")

        } catch (error) {
            return res.status(400).json(error)
            
        }
    }
};

module.exports = docController
