import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CreateGig/MakeGig.css";
import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";

const CreateGig = () => {
  const { serviceProviderAuth } = useServiceProviderAuth();

  const [categories, setCategories] = useState([]);
  const [gigData, setGigData] = useState({
    title: "",
    description: "",
    price: "",
    experience: "",
    availabilityHours: "",
    categoryId: "",
    isTechnical: false,
    image: null,
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/categories/getCategoriesByType",
          {
            params: { isTechnical: gigData.isTechnical },
            headers: {
              Authorization: `${serviceProviderAuth.token}`,
            },
          }
        );
        setCategories(response.data.categories || []);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, [gigData.isTechnical, serviceProviderAuth.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigData({
      ...gigData,
      [name]: value,
    });
  };

  const handleTimeChange = () => {
    // Format the availabilityHours when startTime or endTime changes
    if (startTime && endTime) {
      setGigData({
        ...gigData,
        availabilityHours: `${startTime} - ${endTime}`,
      });
    }
  };

  useEffect(() => {
    handleTimeChange();
  }, [startTime, endTime]);

  const handleCheckboxChange = (e) => {
    setGigData({
      ...gigData,
      isTechnical: e.target.checked,
      categoryId: "", // Reset selected category
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
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", gigData.image);
      formDataToUpload.append("upload_preset", "sp-cnic");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfw3oi6am/image/upload",
        formDataToUpload
      );

      const imageUrl = uploadResponse?.data?.secure_url;

      if (!imageUrl) {
        setError("Image upload failed. Please try again.");
        return;
      }

      const dataToSend = {
        title: gigData.title,
        description: gigData.description,
        price: gigData.price,
        experience: gigData.experience,
        availabilityHours: gigData.availabilityHours,
        categoryId: gigData.categoryId,
        serviceProviderId: serviceProviderAuth.user._id,
        isTechnical: gigData.isTechnical,
        image: imageUrl,
      };

      const response = await axios.post(
        `http://localhost:4000/api/v1/gig/createGig/${dataToSend.serviceProviderId}`,
        dataToSend,
        {
          headers: {
            Authorization: `${serviceProviderAuth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Gig created successfully!");
      setError("");
      setGigData({
        title: "",
        description: "",
        price: "",
        availabilityHours: "",
        categoryId: "",
        isTechnical: false,
        image: null,
      });
      setImagePreview(null);
      setStartTime("");
      setEndTime("");
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
          placeholder="Gig Title"
          value={gigData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={gigData.experience}
          onChange={handleChange}
          required
          min="0"
          step="1"
          max="50"
        />

        <textarea
          name="description"
          placeholder="Gig Description"
          value={gigData.description}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>

        <div className="form-row">
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={gigData.price}
            onChange={handleChange}
            required
          />

          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <input
            type="text"
            name="availabilityHours"
            placeholder="Availability Hours"
            value={gigData.availabilityHours}
            readOnly
          />
        </div>

        <div className="form-row">
          <label>
            Is this a Technical Gig?
            <input
              type="checkbox"
              name="isTechnical"
              checked={gigData.isTechnical}
              onChange={handleCheckboxChange}
            />
          </label>
          <select
            name="categoryId"
            value={gigData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="image-upload">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>

        <button type="submit" className="submit-btn">
          Create Gig
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
