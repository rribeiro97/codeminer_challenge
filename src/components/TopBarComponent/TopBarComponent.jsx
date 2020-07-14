import React from 'react';
import './TopBarComponent.scss'
const TopBarComponent = ( props ) => {
  const isMobile = window.innerWidth < 600;    
  return (
    <header className="TopBarComponent">
      <nav className="header">
        <div className="container header__display">
          <div className="header__logo">
            <img
              src="assets/logo.svg"
              alt="logo"
            />
          </div>
          <div className="header__profile">
            <img
              src="assets/walter-white.jpg"
              alt="logo"
            />
            {!isMobile && <span>Walter White</span>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBarComponent;
