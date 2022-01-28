import React from 'react';
import './Header.css';

import Search from "./Search";

function Header() {
  return (
    <div className="header">
      <div className="header_section">
        <h4 class="logo"> CryptoCoin </h4>
        <Search/>
      </div>

    </div>
  );
}

export default Header;
