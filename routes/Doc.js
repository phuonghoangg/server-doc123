const docController = require('../controllers/DocController')
const middlewareController = require('../controllers/middlewareController')

const router = require('express').Router()

router.post("/",middlewareController.verifyToken,docController.AddDoc)

router.get("/",docController.GetAllDoc)
router.get("/f/:id",docController.FindDoc)
router.get("/:id",docController.GetADoc)

router.put("/:id",docController.UpdateDoc)

router.delete("/:id",middlewareController.verifyTokenAndAdmin,docController.DeleteDoc)


module.exports = router