import express from "express"
import { addOrderController, getAllOrdersController, getClientOrdersController, getNonTechOrdersController, getServiceProviderOrdersController, getTechOrdersController, updateOrderStatusController } from "../../Controllers/OrdersControllers/ordersControllers";
import { authenticateServiceProvider, checkUser } from "../../Middlewares/authMiddlewares";
const router=express.Router();

router.get("/getAllOrders",getAllOrdersController);
router.get("/getTechOrders",getTechOrdersController)
router.get("/getNonTechOrders",getNonTechOrdersController);
router.get("/getClientOrders/:id",checkUser,getClientOrdersController);
router.get("/getServiceProviderOrders/:id",authenticateServiceProvider,getServiceProviderOrdersController);
router.post("/addOrder",addOrderController);
router.put("/updateOrderStatus/:id", updateOrderStatusController); 






export default router;