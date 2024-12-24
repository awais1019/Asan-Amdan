import React, { useState } from "react";
import axios from "axios";
import {useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";

const ServiceProviderForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    cnicPicture: null,
    location: "",
    ordersCompleted: 0, // Field for ordersCompleted
    overallEarnings: 0, // Field for overallEarnings
  });
  const {serviceProviderAuth,setServiceProviderAuth}=useServiceProviderAuth();

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cnicPicture: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    // Phone number validation
    if (!formData.phoneNumber || !/^03\d{2}-?\d{7}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "A valid Pakistani phone number starting with '03' is required.";
    }

    // CNIC picture validation
    if (!(formData.cnicPicture instanceof File)) {
      newErrors.cnicPicture = "CNIC picture is required.";
    }

    // Location validation
    if (!formData.location || formData.location.trim().length === 0) {
      newErrors.location = "Location cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Uploading CNIC image to Cloudinary...");

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", formData.cnicPicture);
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
      console.log("it is the upload response ", uploadResponse);
      const imageUrl = uploadResponse?.data?.secure_url;
      console.log("it is the image url", imageUrl);
      if (!imageUrl) {
        setErrors({ form: "Image upload failed. Please try again." });
        return;
      }

      // Now prepare the data to send as JSON (including the image URL)
      const dataToSend = {
        ...formData,
        cnicPicture: imageUrl, // Add the image URL here
      };

      // Send the data as JSON
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/serviceProviderRegister',
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json", // Correct Content-Type for JSON data
          },
        }
      );
      console.log("Registration successful:", response.data);
      console.log("this is the token",response.data.token);
      localStorage.setItem("Token", response.data.token);
      setServiceProviderAuth(response.data.data);

      setSuccessMessage(response.data.msg);
      setErrors({}); // Clear errors on success
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        phoneNumber: "",
        cnicPicture: null,
        location: "",
        ordersCompleted: 0,
        overallEarnings: 0,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ form: error.response?.data?.message || "Server error." });
    }
  };

  return (
    <div>
      <h1>Register as Service Provider</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.form && <p className="error-message">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div>
          <label>CNIC Picture:</label>
          <input
            type="file"
            name="cnicPicture"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.cnicPicture && (
            <span className="error">{errors.cnicPicture}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ServiceProviderForm;
