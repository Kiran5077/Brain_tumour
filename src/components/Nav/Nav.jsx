import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isUser = localStorage.getItem("isUser") === "true";
  const userEmail = localStorage.getItem("userEmail") || "";
  const adminEmail = localStorage.getItem("adminEmail") || "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white font-nunito">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 md:px-6">
        {/* Logo */}
  <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-2">
  <img
    src="https://storage.googleapis.com/a1aa/image/88f60df2-9c10-4364-32e1-ec98a5bb5860.jpg"
    alt="Brain icon"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  />
  <span className="mt-1 md:mt-0 bg-blue-600 text-white font-semibold text-xs sm:text-sm md:text-base px-2 py-0.5 rounded-sm select-none text-center md:text-left">
    Brain Tumor Detection
  </span>
</div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-600 text-xs font-semibold tracking-wide">
          <ul className="flex items-center space-x-6">
            <li><Link to="/" className="hover:text-gray-900">HOME</Link></li>
            <li><Link to="/about" className="hover:text-gray-900">ABOUT</Link></li>

            {isAdmin && (
              <>
                <li><Link to="/managecontact" className="hover:text-gray-900">MNGCONTACT</Link></li>
                <li><Link to="/adminfeedback" className="hover:text-gray-900">MNGFEEDBACK</Link></li>
                <li><Link to="/adminprediction" className="hover:text-gray-900">MNGPREDICTION</Link></li>
                <li><Link to="/admin-dashboard" className="hover:text-gray-900">REG USERS</Link></li>
                <li className="text-blue-600">{adminEmail}</li>
              </>
            )}

            {isUser && !isAdmin && (
              <>
                <li><Link to="/prediction" className="hover:text-gray-900">PREDICTION</Link></li>
                <li><Link to="/contact" className="hover:text-gray-900">CONTACT</Link></li>
                <li><Link to="/feedback" className="hover:text-gray-900">FEEDBACK</Link></li>
                <li className="text-blue-600">{userEmail}</li>
              </>
            )}

            {(isAdmin || isUser) && (
              <li className="relative">
                <div
                  className="flex items-center space-x-1 cursor-pointer hover:text-gray-900"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src="https://storage.googleapis.com/a1aa/image/d829813f-f985-4df7-022b-bfc6684752b3.jpg"
                    alt="User"
                    className="rounded-full w-5 h-5"
                  />
                  <span>{isAdmin ? "ADMIN" : "USER"}</span>
                  <i className="fas fa-caret-down"></i>
                </div>

                {dropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-md py-1 text-sm w-40 z-50">
                  
                    <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 text-red-700">Logout</button>
                  </div>
                )}
              </li>
            )}

            {!isAdmin && !isUser && (
              <>
                <li><Link to="/contact" className="hover:text-gray-900">CONTACT</Link></li>
                <li><Link to="/feedback" className="hover:text-gray-900">FEEDBACK</Link></li>
                <li><Link to="/user" className="hover:text-gray-900">USER</Link></li>
                <li>
                  <Link to="/register" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1">
                    <span>Register</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
          <ul className="space-y-2 text-xs font-semibold text-gray-700">
            <li><Link to="/" className="block hover:text-gray-900">HOME</Link></li>
            <li><Link to="/about" className="block hover:text-gray-900">ABOUT</Link></li>

            {isAdmin && (
              <>
                <li><Link to="/managecontact" className="block hover:text-gray-900">MNGCONTACT</Link></li>
                <li><Link to="/adminfeedback" className="block hover:text-gray-900">MNGFEEDBACK</Link></li>
                <li><Link to="/adminprediction" className="block hover:text-gray-900">MNGPREDICTION</Link></li>
                <li><Link to="/admin-dashboard" className="block hover:text-gray-900">REG USERS</Link></li>
                <li className="text-blue-600">{adminEmail}</li>
              </>
            )}

            {isUser && !isAdmin && (
              <>
                <li><Link to="/prediction" className="block hover:text-gray-900">PREDICTION</Link></li>
                <li><Link to="/contact" className="block hover:text-gray-900">CONTACT</Link></li>
                <li><Link to="/feedback" className="block hover:text-gray-900">FEEDBACK</Link></li>
                <li className="text-blue-600">{userEmail}</li>
              </>
            )}

            {(isAdmin || isUser) && (
              <>
                <li><Link to="/password" className="block hover:text-gray-900">Change Password</Link></li>
                <li><button onClick={handleLogout} className="block w-full text-left hover:text-red-700">Logout</button></li>
              </>
            )}

            {!isAdmin && !isUser && (
              <>
                <li><Link to="/contact" className="block hover:text-gray-900">CONTACT</Link></li>
                <li><Link to="/feedback" className="block hover:text-gray-900">FEEDBACK</Link></li>
                <li><Link to="/user" className="block hover:text-gray-900">USER</Link></li>
                <li>
                  <Link to="/register" className="block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-center">
                    Register <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
