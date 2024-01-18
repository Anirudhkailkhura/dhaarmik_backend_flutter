const router = require("express").Router();
const cartController = require("../controllers/cartControllers");
//const { verifyToken } = require("../middleware/verifyToken");

router.get("/find/", cartController.getCart); // Fix here
router.post("/",  cartController.addCart);
router.delete("/:cartItem",  cartController.deleteCartItem);

module.exports = router;
