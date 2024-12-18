import express from "express";
import { addCategoryController, deleteCategoryController, getAllCategoriesController, getNonTechCategoriesController, getTechCategoriesController, updateCategoryController } from "../../Controllers/CategoriesControllers/categoriesController.js";
import { checkAdmin, checkUser } from "../../Middlewares/authMiddlewares.js";
const router=express.Router();

router.post("/addCategory",checkUser,checkAdmin,addCategoryController)
router.delete("/deleteCategory/:id",checkUser,checkAdmin,deleteCategoryController)
router.put("/updateCategory/:id",checkUser,checkAdmin,updateCategoryController);
router.get("/getAllCategories",getAllCategoriesController);
router.get("/getTechCategories",getTechCategoriesController);
router.get("/getNonTechCategories",getNonTechCategoriesController);



export default router;