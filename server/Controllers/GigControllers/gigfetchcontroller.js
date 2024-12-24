export const getPendingGigsController = async (req, res) => {
    try {
      const pendingGigs = await Gig.find({ status: "pending" }).populate("categoryId").populate("serviceProviderId");
  
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
  