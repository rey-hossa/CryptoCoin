
import './Pcrypto.css';

import {Context} from "../App";
import React, { useContext } from 'react';

function Pcrypto({id, name, price, volume1day, volume1mth, coinData}) {

  const {preferedListState, apiIconDataState} = useContext(Context);
  const [preferedList, setPreferedList] = preferedListState;
  const [apiIconData, setApiIconData] = apiIconDataState;

  let cryptoinfo_div = document.getElementById(id);

  function allStorage() {
      var values = [],
          keys = Object.keys(localStorage),
          i = keys.length;
      while ( i-- ) {
          values.push( JSON.parse(localStorage.getItem(keys[i])) );
      }
      return values;
  }

  function removePrefered(){
    localStorage.removeItem(id);
    setPreferedList(allStorage());
    console.log(localStorage);

    cryptoinfo_div.style.display = "flex";
  }

  let url;
  apiIconData.map( icon =>(
    icon.asset_id == id ? url=icon.url : ""
  ));


  function MoneyFormat(labelValue)
  {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+9).toLocaleString() + "B"
       // Six Zeroes for Millions
       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6) + "M"
       // Three Zeroes for Thousands
       : Math.abs(Number(labelValue)) >= 1.0e+3

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+3) + "K"

       : Math.abs(Number(labelValue));

   }

  let volume1day_int = parseInt(volume1day);
  let volume1day_final = MoneyFormat(volume1day_int);

  let volume1mth_int = parseInt(volume1mth);
  let volume1mth_final = MoneyFormat(volume1mth_int);


  return (
    <div className="pcrypto">
      <div className="pcrypto_name">
        <img className="pcrypto_icon" src={url}/>
        <p className="pcrypto_name_name">{name} </p>
        <p className="pcrypto_id">{id} </p>
      </div>

      <div className="pcrypto_data">
        <p>$ {volume1day_final}</p>
        <p>$ {volume1mth_final}</p>
        {price === "undefined" ? <p>Not Available</p> : <p>$ {parseFloat(price).toLocaleString(undefined, {maximumFractionDigits: 2})}</p>}
      </div>
      <i className="fas fa-heart" id="pcrypto_heart_icon" onClick={removePrefered}></i>
    </div>
  );
}

export default Pcrypto;
