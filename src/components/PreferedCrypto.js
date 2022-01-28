
import './PreferedCrypto.css';
import {Context} from "../App";
import React, { useContext } from 'react';

import Pcrypto from "./Pcrypto";

function PreferedCrypto() {

  const {apiDataState, searchState, listElementsState, preferedListState} = useContext(Context);
  const [apiData, setApiData] = apiDataState;
  const [search, setSearch] = searchState;
  const [listElements, setListElements] = listElementsState;
  const [preferedList, setPreferedList] = preferedListState;

  //to filter when the user enters something in the search bar
  const filteredPreferedCoins = preferedList.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // If there are not preferred crypto the section disappears
  let preferedcrypto_div = document.getElementById('preferedcrypto');

  if(preferedList.length == 0){
    if(preferedcrypto_div != null){
      preferedcrypto_div.style.display = "none";
    }
  }else {
    if(preferedcrypto_div != null){
      preferedcrypto_div.style.display = "flex";
    }
  }

  return (
    <div className="preferedcrypto" id="preferedcrypto">

      <div className="preferedcrypto_description">
        <p className="preferedcrypto_description_name">Name</p>
        <div className="preferedcrypto_description_data">
          <p className="preferedcrypto_desc_volume1day">Volume 1 Day</p>
          <p className="preferedcrypto_desc_volume1mth">Volume 1 Month</p>
          <p>Price</p>
        </div>
        <i className="fas fa-heart" id="space"></i>
      </div>

      <div className="preferedcrypto_container">
        {filteredPreferedCoins.map(coin =>(
            <Pcrypto
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
  );
}

export default PreferedCrypto;
