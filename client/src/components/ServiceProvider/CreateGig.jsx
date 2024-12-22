import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateGig/MakeGig.css";

const CreateGig = () => {
  const [gigData, setGigData] = useState({
    title: "",
    description: "",
    experience: "",
    price: "",
    availabilityHours: "",
    location: "",
    category: "",
    isTechnical: false,
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

  const handleCheckboxChange = (e) => {
    setGigData({
      ...gigData,
      isTechnical: e.target.checked,
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

    try {
      console.log("Uploading image to Cloudinary...");

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", gigData.image);
      formDataToUpload.append("upload_preset", "sp-cnic");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfw3oi6am/image/upload",
        formDataToUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse?.data?.secure_url;
      console.log("Image URL:", imageUrl);

      if (!imageUrl) {
        setError("Image upload failed. Please try again.");
        return;
      }

      const dataToSend = {
        ...gigData,
        image: imageUrl,
      };

      const response = await axios.post("http://localhost:4000/api/v1/gig/createGig", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess("Gig created successfully!");
      setError("");
      setGigData({
        title: "",
        description: "",
        experience: "",
        price: "",
        availabilityHours: "",
        location: "",
        category: "",
        isTechnical: false,
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
          name="title"
          placeholder="Title"
          value={gigData.title}
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
          type="number"
          name="experience"
          placeholder="Experience (in years)"
          value={gigData.experience}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (in $)"
          value={gigData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="availabilityHours"
          placeholder="Availability Hours (e.g., 09:00 - 17:00)"
          value={gigData.availabilityHours}
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

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="isTechnical"
              checked={gigData.isTechnical}
              onChange={handleCheckboxChange}
            />
            Is Technical?
          </label>
        </div>

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
