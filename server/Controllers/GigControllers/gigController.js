import Gig from "../../Models/gigModel.js";

export const createGigController = async (req, res) => {
  try {
    const { title, description, experience, price, availabilityHours, location, image, video, document, category } = req.body;
    const { serviceProviderId } = req.params; 

    if(!title || !description || !experience || !price || !availabilityHours ||  !image || !category || !serviceProviderId) {
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
      video,
      document,
      category,
      serviceProviderId: serviceProviderId, 
    });

    // Save the new Gig to the database
    const savedGig = await newGig.save();

    res.status(201).json({
        success:true,
      msg: "Gig created successfully",
      gig: savedGig,
    });
  } catch (error) {
    console.error("error while creating gig",error);
    res.status(500).json({
        success:false,
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

