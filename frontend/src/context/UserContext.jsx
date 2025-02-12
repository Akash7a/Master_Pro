import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const AppContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AppProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const signUpUser = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/users/signUp`, userData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            console.log("Register response:", response.data);
            const { authToken } = response.data.data;

            localStorage.setItem("authToken", authToken);
            setToken(authToken);

            await getUserProfile();

            return response.data;
        } catch (error) {
            console.error("Sign-up error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "failed to sign up the user");
            throw new Error(`Failed to sign up the user: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    const loginUser = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`, userData, { withCredentials: true });

            console.log("User login response:", response.data);
            const { authToken } = response.data.data;

            setToken(authToken);
            localStorage.setItem("authToken", authToken);

            await getUserProfile();

            return response.data;
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "failed to login the user");
            throw new Error(`Failed to login the user: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    const logoutUser = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            console.log("User logout response:", response.data);

            localStorage.removeItem("authToken");
            setToken("");
            setProfile(null);

            return response.data;
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "failed to logout the user")
            throw new Error(`Failed to logout the user: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    const getUserProfile = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setProfile(response.data.data.user);

            return response.data;
        } catch (error) {
            console.error("Error fetching profile", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to get the user profile");
            throw new Error(`Failed to fetch user profile: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    const editUserProfile = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/users/update/${profile._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            console.log("Profile Update Response:", response.data);
            setProfile(response.data.data.user);

            await getUserProfile();

            return response.data;
        } catch (error) {
            console.error("Profile Update Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to update user please try again.");
            throw new Error(`Failed to update profile: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (token) {
            getUserProfile();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ logoutUser, signUpUser, loginUser, getUserProfile, editUserProfile, profile, token, setLoading, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;