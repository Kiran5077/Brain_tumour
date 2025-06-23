import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isUser = localStorage.getItem("isUser") === "true";
  const userEmail = localStorage.getItem("userEmail") || "";
  const adminEmail = localStorage.getItem("adminEmail") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #00c6ff, #6a00ff, #ff0099, #00c6ff)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradientMove 4s linear infinite',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-black shadow-md' : 'bg-black text-white'}`}>
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/assets/brain4.jpg" alt="Brain icon" className="w-10 h-10 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          <span className="font-bold text-sm sm:text-base md:text-lg whitespace-nowrap" style={gradientTextStyle}>
            TumorDetect
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Link to="/" className="hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"><i className="fas fa-home"></i><span>HOME</span></Link>
          <Link to="/about" className="hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"><i className="fas fa-info-circle"></i><span>ABOUT</span></Link>
          <Link to="/contact" className="hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"><i className="fas fa-envelope"></i><span>CONTACT</span></Link>

          {!isAdmin && !isUser && (
            <>
              <Link to="/feedback" className="hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"><i className="fas fa-comment-dots"></i><span>FEEDBACK</span></Link>
              <Link to="/user" className="hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"><i className="fas fa-user"></i><span>USER</span></Link>
              <Link to="/register" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center space-x-1"><i className="fas fa-user-plus"></i><span>Register</span></Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/managecontact" className="hover:text-gray-300">MNGCONTACT</Link>
              <Link to="/adminfeedback" className="hover:text-gray-300">MNGFEEDBACK</Link>
              <Link to="/adminprediction" className="hover:text-gray-300">MNGPREDICTION</Link>
              <Link to="/admin-dashboard" className="hover:text-gray-300">REG USERS</Link>
              <span className="text-blue-400">{adminEmail}</span>
            </>
          )}

          {isUser && !isAdmin && (
            <>
              <Link to="/prediction" className="hover:text-gray-300">PREDICTION</Link>
              <Link to="/feedback" className="hover:text-gray-300">FEEDBACK</Link>
              <span className="text-blue-400">{userEmail}</span>
            </>
          )}

          {(isAdmin || isUser) && (
            <div className="relative">
              <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
                <img src="https://storage.googleapis.com/a1aa/image/d829813f-f985-4df7-022b-bfc6684752b3.jpg" alt="User" className="rounded-full w-5 h-5" />
                <span>{isAdmin ? "ADMIN" : "USER"}</span>
                <i className="fas fa-caret-down"></i>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-md py-1 text-sm w-40 z-50 text-black">
                  <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 text-red-700 w-full text-left">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <i className={`fas fa-bars text-xl ${isScrolled ? 'text-black' : 'text-white'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 py-2 ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"><i className="fas fa-home"></i><span>HOME</span></Link></li>
            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"><i className="fas fa-info-circle"></i><span>ABOUT</span></Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"><i className="fas fa-envelope"></i><span>CONTACT</span></Link></li>

            {!isAdmin && !isUser && (
              <>
                <li><Link to="/feedback" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"><i className="fas fa-comment-dots"></i><span>FEEDBACK</span></Link></li>
                <li><Link to="/user" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"><i className="fas fa-user"></i><span>USER</span></Link></li>
                <li><Link to="/register" onClick={() => setMobileMenuOpen(false)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1 justify-center"><i className="fas fa-user-plus"></i><span>Register</span></Link></li>
              </>
            )}

            {isAdmin && (
              <>
                <li><Link to="/managecontact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">MNGCONTACT</Link></li>
                <li><Link to="/adminfeedback" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">MNGFEEDBACK</Link></li>
                <li><Link to="/adminprediction" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">MNGPREDICTION</Link></li>
                <li><Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">REG USERS</Link></li>
                <li className="text-blue-400">{adminEmail}</li>
              </>
            )}

            {isUser && !isAdmin && (
              <>
                <li><Link to="/prediction" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">PREDICTION</Link></li>
                <li><Link to="/feedback" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">FEEDBACK</Link></li>
                <li className="text-blue-400">{userEmail}</li>
              </>
            )}

            {(isAdmin || isUser) && (
              <>
                <li><Link to="/password" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">Change Password</Link></li>
                <li><button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-red-700">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
