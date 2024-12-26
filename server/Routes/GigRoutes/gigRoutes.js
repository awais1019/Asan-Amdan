import express from "express"
const router=express.Router();
import { createGigController, deleteGigController, getAllGigsController, getGigByIdController, getGigForServiceProviderController, getPendingGigsController, updateGigController, 
    updateGigStatusController,
    getApprovedGigsController,
    getGigByCategoryIdController
 } from "../../Controllers/GigControllers/gigController.js";
import { authenticateServiceProvider, checkAdmin } from "../../Middlewares/authMiddlewares.js";

router.post('/createGig/:serviceProviderId',authenticateServiceProvider,createGigController);
router.get('/getAllGigs',getAllGigsController)
router.get('/getServiceProviderGigs/:serviceProviderId',authenticateServiceProvider,getGigForServiceProviderController)
router.get('/getPendingGigs',checkAdmin,getPendingGigsController);
router.get('/getApprovedGigs',getApprovedGigsController);
router.get('/getGigById/:gigId',getGigByIdController);
router.get('getGigByCategoryId/:categoryId',getGigByCategoryIdController);
router.put('/updateGig/:gigId',authenticateServiceProvider,updateGigController);
router.delete('/deleteGig/:gigId',authenticateServiceProvider,deleteGigController);
router.put('/updateGigStatus/:gigId',checkAdmin,updateGigStatusController);


//checkAdmin,


export default router;