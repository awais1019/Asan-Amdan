import Gig from "../../Models/gigModel.js";
import cloudinary from "../../util/cloudinary.js";

export const createGigController = async (req, res) => {
  try {
    const {
      title,
      description,
      experience,
      price,
      availabilityHours,
      location,
      image, 
      // video, 
      // document, 
      categoryId,
      isTechnical
    } = req.body;
    const { serviceProviderId } = req.params;

    console.log("it is req.body",req.body);
    console.log("it is sp id",serviceProviderId)
    

    if (
      !title ||
      !description ||
      !experience ||
      !price ||
      !availabilityHours ||
      !image ||
      !categoryId ||
      !serviceProviderId ||
      !isTechnical
    ) {
      console.log("something not found");
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }


    // Create a new Gig document
    const newGig = new Gig({
      title,
      description,
      experience,
      price,
      availabilityHours,
      location,
      image,
      // video,
      // document,
      categoryId,
      serviceProviderId,
      isTechnical
    });

    // Save the new Gig to the database
    const savedGig = await newGig.save();

    res.status(201).json({
      success: true,
      msg: "Gig created successfully",
      gig: savedGig,
    });
  } catch (error) {
    console.error("Error while creating gig:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not create gig.",
    });
  }
};

export const getGigByIdController = async (req, res) => {
  try {
    const { gigId } = req.params; 

    if (!gigId) {
      return res.status(400).json({
        success: false,
        msg: "Gig ID is required",
      });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        msg: "Gig not found",
      });
    }

    // Return the found gig
    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    console.error("Error while getting gig:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not retrieve gig.",
    });
  }
};

export const getGigForServiceProviderController = async (req, res) => {
  try {
    const { serviceProviderId } = req.params;

    if (!serviceProviderId) {
      return res.status(400).json({
        success: false,
        msg: "Service Provider ID is required",
      });
    }

    const gigs = await Gig.find({ serviceProviderId: serviceProviderId });

    if (!gigs || gigs.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No gigs found for this service provider",
      });
    }

    res.status(200).json({
      success: true,
      gigs,
    });
  } catch (error) {
    console.error("Error while getting gigs for service provider:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not retrieve gigs.",
    });
  }
};

export const getAllGigsController = async (req, res) => {
  try {
    const gigs = await Gig.find()

    if (gigs.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No gigs found",
      });
    }

    res.status(200).json({
      success: true,
      gigs: gigs,
    });
  } catch (error) {
    console.error("Error while fetching gigs:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not fetch gigs.",
    });
  }
};

export const deleteGigController = async (req, res) => {
  try {
    const { gigId } = req.params; 

    const gigToDelete = await Gig.findByIdAndDelete(gigId);

    if (!gigToDelete) {
      return res.status(404).json({
        success: false,
        msg: "Gig not found",
      });
    }

    // Return success message after deletion
    res.status(200).json({
      success: true,
      msg: "Gig deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting gig:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not delete gig.",
    });
  }
};

export const updateGigController = async (req, res) => {
  try {
    const { gigId } = req.params; 
    const { title, description, experience, price, availabilityHours, location, image, video, document, category } = req.body;

    if(!gigId || !title || !description || !experience || !price || !availabilityHours ||  !image || !category) {
        return res.status(400).json({success:false,msg:"All fields are required"});
    }

    const updatedData = {
      title,
      description,
      experience,
      price,
      availabilityHours,
      location: location !== undefined ? location : null,
      image,
      video: video !== undefined ? video : null,
      document: document !== undefined ? document : null, 
      category,
    };

    for (let key in updatedData) {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    }

    // Find the gig by its ID and update it
    const updatedGig = await Gig.findByIdAndUpdate(gigId, updatedData, { new: true }); 

    // If no gig is found, return a 404 error
    if (!updatedGig) {
      return res.status(404).json({
        success: false,
        msg: "Gig not found",
      });
    }

    // Return the updated gig
    res.status(200).json({
      success: true,
      msg: "Gig updated successfully",
      gig: updatedGig,
    });
  } catch (error) {
    console.error("Error while updating gig:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not update gig.",
    });
  }
};

export const getPendingGigsController = async (req, res) => {
  try {
    const pendingGigs = await Gig.find({ status: "pending" });

    if (!pendingGigs || pendingGigs.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No pending gigs found",
      });
    }

    res.status(200).json({
      success: true,
      gigs: pendingGigs,
    });
  } catch (error) {
    console.error("Error while fetching pending gigs:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not fetch pending gigs.",
    });
  }
};


import Gig from "../models/gigModel.js"; // Assuming your model file is named gigModel.js

export const updateGigStatusController = async (req, res) => {
  try {
    const { gigId } = req.params; 
    const { status } = req.body; 

    // Check if the status is valid
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid status value. Allowed values are 'pending', 'approved', 'rejected'.",
      });
    }

    // Find and update the gig by ID
    const updatedGig = await Gig.findByIdAndUpdate(
      gigId, 
      { status }, 
      { new: true } 
    );

    // If the gig is not found
    if (!updatedGig) {
      return res.status(404).json({
        success: false,
        msg: "Gig not found.",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      msg: "Gig status updated successfully.",
      gig: updatedGig,
    });
  } catch (error) {
    console.error("Error while updating gig status:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Could not update gig status.",
    });
  }
};
