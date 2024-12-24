import express from "express"
import { loginController, registerController } from "../../Controllers/AuthControllers/userControllers.js";
import { authenticateServiceProvider, checkAdmin, checkUser } from "../../Middlewares/authMiddlewares.js";
const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);


// checking user
router.post("/checkuser", checkUser, (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Valid User",
        data: req.user,
    })
});

// checking admin
router.post("/admin", checkAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Valid Admin",
        data: req.user,
    })
});






export default router;