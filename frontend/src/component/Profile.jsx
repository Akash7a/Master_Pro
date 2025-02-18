import React, { useContext } from "react";
import { AppContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profile, logoutUser } = useContext(AppContext);

  if (!profile) {
    return <p className="text-center mt-10 text-red-500">Profile not found. Please log in.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg text-center">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src={profile.profilePic || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{profile.fullname}</h2>
        <p className="text-gray-600">{profile.email}</p>
      </div>

      {/* User Details */}
      <div className="mt-6 text-left">
        <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
        <div className="mt-2 p-4 bg-gray-100 rounded-lg">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Joined:</strong> {new Date(profile.createdAt).toDateString()}</p>
          <p><strong>Role:</strong> {profile.role.toUpperCase()}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-4 justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          <Link to="/editProfile">Edit Profile</Link>
        </button>
        <button onClick={() => logoutUser()} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;