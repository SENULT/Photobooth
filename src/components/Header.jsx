import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-4 lg:p-6">
      <div className="flex items-center max-w-7xl mx-auto">
        {/* ITSC Logo - theo thiết kế */}
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <div className="text-purple-900 font-bold text-2xl">IT</div>
          </div>
          <div className="text-white">
            <div className="font-bold text-lg leading-tight">INNOVATIVE</div>
            <div className="font-bold text-lg leading-tight">TECHNOLOGY</div>
            <div className="font-bold text-lg leading-tight">STUDENT CLUB</div>
          </div>
        </div>
        
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
