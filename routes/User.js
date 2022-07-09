const middlewareController = require('../controllers/middlewareController')
const userController = require('../controllers/UserController')

const router = require('express').Router()

router.post("/register",userController.RegisterUser)

router.post("/login",userController.LoginUser)

router.post("/logout",middlewareController.verifyToken,userController.LogoutUser)

router.get("/",userController.GetAllUser)

//get 1 user
router.get("/:id",userController.getAnUser)

router.put("/:id",middlewareController.verifyToken,userController.UpdateUser)
router.delete("/:id",middlewareController.verifyToken,userController.DeleteUser)
router.get("/zxczx",(req,res)=>{
    res.send("asdasd")
})


module.exports = router