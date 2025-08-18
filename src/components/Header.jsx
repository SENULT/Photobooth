import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-4 lg:p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">IT</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-lg">INNOVATIVE</h1>
            <h2 className="text-white font-bold text-lg">TECHNOLOGY</h2>
            <p className="text-gray-300 text-sm">STUDENT CLUB</p>
          </div>
        </div>

        {/* Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#generator" className="text-white hover:text-purple-300 transition-colors">
            Generator
          </a>
          <a href="#gallery" className="text-white hover:text-purple-300 transition-colors">
            Gallery
          </a>
          <a href="#about" className="text-white hover:text-purple-300 transition-colors">
            About
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
