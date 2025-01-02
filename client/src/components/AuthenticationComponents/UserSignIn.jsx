import React, { useState } from "react";
import axios from "axios"; // Make sure axios is installed
import "../styles/Authentication/UserSignIn.css";
// import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";
import { useAuth } from "../../Contexts/userContexts";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {userAuth,setUserAuth}=useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post("https://asan-amdan-server.vercel.app/api/v1/auth/login", { email, password });
            if (response.data.success) {
                // Store token in localStorage or cookie (depending on your authentication flow)
                localStorage.setItem("authToken", response.data.token);

                // setServiceProviderAuth(response.data.data);
                setUserAuth(response.data.data);

                // Redirect to dashboard or another protected page
                window.location.href = "/"; // Example redirect
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("An error occurred, please try again.");
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="signin-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
