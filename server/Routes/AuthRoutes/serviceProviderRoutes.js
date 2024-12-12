import express from "express"
import { getServiceProviderController, serviceProviderLoginController, serviceProviderRegisterController, updateServiceProvider } from "../../Controllers/AuthControllers/serviceProviderControllers.js";
import { authenticateServiceProvider } from "../../Middlewares/authMiddlewares.js";
const router=express.Router();


// For Service Provider
router.post('/serviceProviderRegister',serviceProviderRegisterController);
router.post('/serviceProviderLogin',serviceProviderLoginController);
router.put('/updateServiceProvider',authenticateServiceProvider,updateServiceProvider);
router.get('/getServiceProvider/:id',getServiceProviderController);

export default router;