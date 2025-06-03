import express from "express"
import { getAllProducts,getFeaturedProducts,createProduct,deleteProduct,getProductsByCategory,toggleFeaturedProduct} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


const router =express.Router();

router.get("/",protectRoute,adminRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProduct);
router.post("/",protectRoute,adminRoute,createProduct);
router.delete("/:id",protectRoute,adminRoute,deleteProduct);


export default router