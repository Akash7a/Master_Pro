import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/UserContext';

const Users = () => {
    const { users } = useContext(AppContext);

    // Handle sending request to add user to team collaboration
    const sendRequest = (userId) => {
        // Implement logic for sending the request
        console.log(`Request sent to add user with ID: ${userId} to the team`);
        // Example: You can call an API or dispatch an action here
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Users List</h2>
            {users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map(user => (
                        <div key={user._id} className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                            <div className="p-4">
                                {/* Profile Pic */}
                                <div className="flex justify-center mb-4">
                                    <img 
                                        src={user.profilePic || 'https://via.placeholder.com/150'} // Fallback image if no profile pic
                                        alt="Profile"
                                        className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
                                    />
                                </div>
                                {/* User Info */}
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-medium text-gray-800">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                                {/* Send Request Button */}
                                <div className="text-center">
                                    <button 
                                        onClick={() => sendRequest(user._id)} 
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Send Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 mt-8">No users found.</p>
            )}
        </div>
    );
};

export default Users;