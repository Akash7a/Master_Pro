import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { profile, editUserProfile, loading, setLoading, error } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    profilePic: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || "",
        username: profile.username || "",
        email: profile.email || "",
        profilePic: profile.profilePic || "https://via.placeholder.com/150",
      });
    }
  }, [profile]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
          file: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      const updatedProfile = new FormData();
      updatedProfile.append("fullname", formData.fullname);
      updatedProfile.append("username", formData.username);
      updatedProfile.append("email", formData.email);

      if (formData.file) {
        updatedProfile.append("profilePic", formData.file);
      }

      await editUserProfile(updatedProfile);

      toast.success("Profile updated successfully! 🎉", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update profile. ❌", {
        position: "top-center",
      });
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Edit Profile
      </h2>

      <form className="mt-6 space-y-4" onSubmit={updateHandler}>
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={formData.profilePic}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <label className="mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Upload New Photo
            <input type="file" className="hidden" onChange={fileHandler} />
          </label>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            name="fullname"
            value={formData.fullname}
            onChange={changeHandler}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
        {
          error && <p>
            {error}
          </p>
        }
      </form>
    </div>
  );
};

export default EditProfilePage;