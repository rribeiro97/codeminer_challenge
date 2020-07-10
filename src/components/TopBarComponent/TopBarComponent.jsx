import React from 'react';
import './TopBarComponent.scss'
import { Link } from 'react-router-dom';
import UserLoginComponent from '../UserLoginComponent/UserLoginComponent';


const Topbar = () => {

  return (
    <header className="TopBarComponent">
      <nav className="header">
        <div className="container header__display">
          <div className="header__img">
            <img
              src="assets/logo.svg"
              alt="logo"
            />
          </div>
          <UserLoginComponent />
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
