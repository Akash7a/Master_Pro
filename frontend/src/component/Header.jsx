import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">TaskMaster Pro</Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          <Link to="/tasks" className="hover:text-gray-200">Tasks</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-blue-600 py-2">
          <Link to="/" className="block text-center py-2 hover:bg-blue-700" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/profile" className="block text-center py-2 hover:bg-blue-700" onClick={closeMenu}>
            Profile
          </Link>
          <Link to="/tasks" className="block text-center py-2 hover:bg-blue-700" onClick={closeMenu}>
            Tasks
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;