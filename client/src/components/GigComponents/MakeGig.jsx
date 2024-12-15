import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateGig/MakeGig.css";

const CreateGig = () => {
  const [gigData, setGigData] = useState({
    profession: "",
    experience: "",
    description: "",
    rate: "",
    location: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Web Development", "Graphic Design", "Content Writing", "Photography", "Digital Marketing"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigData({
      ...gigData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGigData({ ...gigData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in gigData) {
      formData.append(key, gigData[key]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/gigs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Gig created successfully!");
      setError("");
      setGigData({
        profession: "",
        experience: "",
        description: "",
        rate: "",
        location: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="create-gig-container">
      <h2>Create a Gig</h2>
      <form onSubmit={handleSubmit} className="create-gig-form">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={gigData.profession}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={gigData.description}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>

        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 3 years)"
          value={gigData.experience}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rate"
          placeholder="Rate (per hour in $)"
          value={gigData.rate}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={gigData.location}
          onChange={handleChange}
        />

        <select name="category" value={gigData.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="image-upload">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>

        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
};

export default CreateGig;
