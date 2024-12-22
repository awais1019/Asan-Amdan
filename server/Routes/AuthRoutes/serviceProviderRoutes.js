import express from "express"
import { getServiceProviderController, serviceProviderLoginController, serviceProviderRegisterController, updateServiceProvider } from "../../Controllers/AuthControllers/serviceProviderControllers.js";
import { authenticateServiceProvider } from "../../Middlewares/authMiddlewares.js";
const router=express.Router();


// For Service Provider
router.post('/serviceProviderRegister',serviceProviderRegisterController);
router.post('/serviceProviderLogin',serviceProviderLoginController);
router.put('/updateServiceProvider',authenticateServiceProvider,updateServiceProvider);
router.get('/getServiceProvider/:id',getServiceProviderController);





router.post("/checkServiceProvider", authenticateServiceProvider, (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Valid User",
        data: req.user,
    })
});

export default router;