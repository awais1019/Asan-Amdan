import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending gigs
  const fetchPendingGigs = async () => {
    try {
      const response = await axios.get("/api/gigs/pending"); // Adjust the API path if necessary
      setGigs(response.data.gigs); // Assuming API returns `gigs` in the response
    } catch (err) {
      setError("Failed to fetch pending gigs. Please try again.");
    } finally {
      setLoading(false);
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
      {gigs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Service Provider</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig) => (
              <tr key={gig._id}>
                <td>{gig.title}</td>
                <td>{gig.description}</td>
                <td>${gig.price}</td>
                <td>{gig.categoryId.name}</td>
                <td>{gig.serviceProviderId.name}</td>
                <td>
                  <button>Approve</button>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending gigs found.</p>
      )}
    </div>
  );
};

export default PendingGigs;
