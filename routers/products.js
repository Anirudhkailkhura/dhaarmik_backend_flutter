const router = require("express").Router();
const productController = require("../controllers/productsControllers");

router.get("/", productController.getAllproduct);
router.get("/:id", productController.getProduct);
router.get("/search/:key", productController.searchProduct);
router.post("/", productController.createProduct);


module.exports = router;