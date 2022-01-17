
import './Search.css';

import {Context} from "../App";
import React, { useContext } from 'react';

function Search() {

  const {searchState} = useContext(Context); 
  const [search, setSearch] = searchState;

  const handleChange = e => {
    setSearch(e.target.value);
    //console.log(search);
  };

  return (
    <div className="search">
      <input id="input" type="text"  placeholder="Search" onChange={handleChange} />
      <i id="search_button" className="fas fa-search" ></i>
    </div>
  );
}

export default Search;
