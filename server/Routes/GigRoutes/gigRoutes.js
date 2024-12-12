import express from "express"
const router=express.Router();
import { createGigController, deleteGigController, getAllGigsController, getGigByIdController, updateGigController } from "../../Controllers/GigControllers/gigController.js";
import { authenticateServiceProvider } from "../../Middlewares/authMiddlewares.js";

router.post('/createGig/:serviceProviderId',authenticateServiceProvider,createGigController);
router.get('/getAllGigs',getAllGigsController)
router.get('/getGigById/:gigId',getGigByIdController);
router.put('/updateGig/:gigId',authenticateServiceProvider,updateGigController);
router.delete('/deleteGig/:gigId',authenticateServiceProvider,deleteGigController);





export default router;