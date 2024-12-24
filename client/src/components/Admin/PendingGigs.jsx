import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending gigs
  const fetchPendingGigs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/gig/getPendingGigs",{
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
    } catch (err) {
      setError("Failed to fetch pending gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Approve Gig
  const approveGig = async (gigId) => {
    try {
      await axios.put(`/api/gigs/${gigId}/approve`);
      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== gigId));
      alert("Gig approved successfully!");
    } catch (err) {
      alert("Failed to approve gig. Please try again.");
    }
  };

  // Reject Gig
  const rejectGig = async (gigId) => {
    try {
      await axios.put(`/api/gigs/${gigId}/reject`);
      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== gigId));
      alert("Gig rejected successfully!");
    } catch (err) {
      alert("Failed to reject gig. Please try again.");
    }
  };

  useEffect(() => {
    fetchPendingGigs();
  }, []);

  if (loading) return <p>Loading pending gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pending Gigs</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {gigs.map((gig) => (
          <div
            key={gig._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "300px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={gig.image}
              alt={gig.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{gig.title}</h3>
            <p><b>Description:</b> {gig.description}</p>
            <p><b>Experience:</b> {gig.experience} years</p>
            <p><b>Price:</b> ${gig.price}</p>
            <p><b>Availability:</b> {gig.availabilityHours}</p>
            <p><b>Location:</b> {gig.location || "Not specified"}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => approveGig(gig._id)}
              >
                Approve
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => rejectGig(gig._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingGigs;
