import express from "express"
const router=express.Router();
import { createGigController, deleteGigController, getAllGigsController, getGigByIdController, getGigForServiceProviderController, getPendingGigsController, updateGigController, updateGigStatusController } from "../../Controllers/GigControllers/gigController.js";
import { authenticateServiceProvider, checkAdmin } from "../../Middlewares/authMiddlewares.js";

router.post('/createGig/:serviceProviderId',authenticateServiceProvider,createGigController);
router.get('/getAllGigs',getAllGigsController)
router.get('/getServiceProviderGigs/:serviceProviderId',authenticateServiceProvider,getGigForServiceProviderController)
router.get('/getPendingGigs',checkAdmin,getPendingGigsController);
router.get('/getGigById/:gigId',getGigByIdController);
router.put('/updateGig/:gigId',authenticateServiceProvider,updateGigController);
router.delete('/deleteGig/:gigId',authenticateServiceProvider,deleteGigController);
router.put('/updateGigStatus/:gigId',checkAdmin,updateGigStatusController);





export default router;