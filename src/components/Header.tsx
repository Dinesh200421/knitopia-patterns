
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 bg-lavender/10 border-b border-lavender/20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 mr-2 relative">
            <div className="absolute inset-0 bg-lavender rounded-full animate-knit"></div>
            <div className="absolute inset-2 bg-wool rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-lavender-dark">Knitopia</h1>
        </div>
        <nav className="flex space-x-6">
          <Link to="/" className="text-foreground hover:text-lavender transition-colors">
            Home
          </Link>
          <a href="#" className="text-foreground hover:text-lavender transition-colors">
            Gallery
          </a>
          <a href="#" className="text-foreground hover:text-lavender transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
