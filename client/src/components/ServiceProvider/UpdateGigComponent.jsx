import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // For navigation after update

const UpdateGig = () => {
    const { gigId } = useParams();
    const [gigData, setGigData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the gig data when the page loads
        axios.get(`/api/gigs/${gigId}`)
            .then(response => {
                setGigData(response.data.gig);
            })
            .catch(error => {
                console.error("Error fetching gig data", error);
            });
    }, [gigId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGigData({ ...gigData, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // Make an API call to update the gig
        axios.put(`/api/gigs/${gigId}`, gigData)
            .then(response => {
                navigate(`/gigs/${gigId}`); // Redirect to the updated gig details page
            })
            .catch(error => {
                console.error("Error updating gig", error);
            });
    };

    return (
        <div className="update-gig">
            <h2>Update Gig</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="title"
                    value={gigData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={gigData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={gigData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={gigData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <button type="submit">Update Gig</button>
            </form>
        </div>
    );
};

export default UpdateGig;
