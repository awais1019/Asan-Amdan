import Orders from "../../Models/ordersModels.js";



// This File Will Be Rechecked Again For Validations And Professionally Coding.



// getting all order
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Orders.find().populate("clientId serviceProviderId gigId categoryId", "-password");
        res.status(200).json({ message: "Orders retrieved successfully.", orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders.", error: error.message });
    }
};

// getting Tech Orders
export const getTechOrdersController = async (req, res) => {
    try {
        const techOrders = await Orders.find({ isTechnical: true }).populate("clientId serviceProviderId gigId categoryId", "-password");
        res.status(200).json({ message: "Technical orders retrieved successfully.", techOrders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve technical orders.", error: error.message });
    }
};

// getting Non Tech Orders
export const getNonTechOrdersController = async (req, res) => {
    try {
        const nonTechOrders = await Orders.find({ isTechnical: false }).populate("clientId serviceProviderId gigId categoryId", "-password");
        res.status(200).json({ message: "Non-technical orders retrieved successfully.", nonTechOrders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve non-technical orders.", error: error.message });
    }
};

// getting clients orders
export const getClientOrdersController = async (req, res) => {
    try {
        const { id } = req.params;

        const clientOrders = await Orders.find({ clientId: id }).populate("gigId categoryId serviceProviderId", "-password");
        if (!clientOrders.length) {
            return res.status(404).json({ message: "No orders found for the specified client." });
        }

        res.status(200).json({ message: "Client orders retrieved successfully.", clientOrders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve client orders.", error: error.message });
    }
};

// getting Service Providers Orders
export const getServiceProviderOrdersController = async (req, res) => {
    try {
        const { id } = req.params;

        const providerOrders = await Orders.find({ serviceProviderId: id }).populate("gigId categoryId clientId", "-password");
        if (!providerOrders.length) {
            return res.status(404).json({ message: "No orders found for the specified service provider." });
        }

        res.status(200).json({ message: "Service provider orders retrieved successfully.", providerOrders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve service provider orders.", error: error.message });
    }
};

// add orders 
export const addOrderController = async (req, res) => {
    try {
        const { clientId, serviceProviderId, gigId, orderDetails, categoryId, isTechnical } = req.body;

        if (!clientId || !serviceProviderId || !gigId || !orderDetails || !categoryId || isTechnical === undefined) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newOrder = new Orders({
            clientId,
            serviceProviderId,
            gigId,
            orderDetails,
            categoryId,
            isTechnical,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully.", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order.", error: error.message });
    }
};

// updating order status
export const updateOrderStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !["pending", "in-progress", "completed", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid or missing status." });
        }

        const updatedOrder = await Orders.findByIdAndUpdate(
            id,
            { orderStatus: status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully.", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status.", error: error.message });
    }
};

