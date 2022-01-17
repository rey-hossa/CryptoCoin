import React from 'react';
import './Header.css';

import Search from "./Search";

import logo from '../images/logo-3d.png';

function Header() {
  return (
    <div className="header">
      <div className="header_section">
        <h4 class="logo"> CryptoCoin </h4>
        <Search/>
      </div>
       {/*<hr/>*/}

    </div>
  );
}

export default Header;
