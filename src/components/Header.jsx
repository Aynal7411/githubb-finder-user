import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Github size={28} />
            <h1>GitHub User Finder</h1>
          </div>
          <a 
            href="https://github.com" 
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
            <span>GitHub.com</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;