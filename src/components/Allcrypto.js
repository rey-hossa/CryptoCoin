

import './Allcrypto.css';
import {Context} from "../App";
import React, { useContext } from 'react';

import Crypto from "./Crypto";

function Allcrypto() {

  const {apiDataState,searchState, listElementsState, preferedListState} = useContext(Context);
  const [apiData, setApiData] = apiDataState;
  const [search, setSearch] = searchState;
  const [listElements, setListElements] = listElementsState;

  //to filter when the user enters something in the search bar
  const filteredCoins = apiData.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  function handleClick(){ // increase number of crypto displayed
    setListElements(listElements+20);
  }


  return (
    <>
    <div className="allcrypto">

      <div className="description">
        <p className="description_name">Name</p>
        <div className="description_data">
          <p className="desc_volume1day">Volume 1 Day</p>
          <p className="desc_volume1mth">Volume 1 Month</p>
          <p>Price</p>
        </div>
        <i className="fas fa-heart" id="space"></i>
      </div>

      <div className="allcrypto_container">
        {filteredCoins.slice(0, listElements).map(coin =>(
            <Crypto
              key={coin === undefined ? "" : `${coin.asset_id}`}
              id={coin === undefined ? "" : `${coin.asset_id}`}
              name={coin === undefined ? "" : `${coin.name}`}
              price={coin === undefined ? "" : `${coin.price_usd}`}
              volume1hrs={coin === undefined ? "" : `${coin.volume_1hrs_usd}`}
              volume1day={coin === undefined ? "" : `${coin.volume_1day_usd}`}
              volume1mth={coin === undefined ? "" : `${coin.volume_1mth_usd}`}
              coinData={coin}
            />
        ))}
      </div>

    </div>
    <button className="more_button" onClick={handleClick}>More</button>
    </>
  );
}

export default Allcrypto;
