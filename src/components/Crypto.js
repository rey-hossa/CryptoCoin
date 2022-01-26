
import './Crypto.css';

import {Context} from "../App";
import React, { useContext } from 'react';

import CryptoInfo from "./CryptoInfo";

function Crypto({id, name, price, volume1hrs, volume1day, volume1mth, coinData}) {

  const {preferedListState, renderTriggerState, apiIconDataState} = useContext(Context);
  const [preferedList, setPreferedList] = preferedListState;
  const [renderTrigger, setRenderTrigger] = renderTriggerState;
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

  function logData(){

    function addPrefered(){
      localStorage.setItem(id,JSON.stringify(coinData));
      setPreferedList(allStorage());
    }
    addPrefered();
    console.log(localStorage);

    cryptoinfo_div.style.display = "none"; // quando viene cliccata la cripto scompare nell sezione "tutti"
  }

  let id_info = id + "_info";
  function OpenCryptoInfo(){ // al click sulla cripto si apre la sezione informazioni
    let cryptoinfo_div = document.getElementById(id_info);
    cryptoinfo_div.style.display = "flex";
  }

 //non fa vedere in tutti quelli gia presenti in preferiti (da risolvere)
  if(cryptoinfo_div != null){
    if(preferedList.length != 0){
      preferedList.map(coin => (
        coin.asset_id == id ? cryptoinfo_div.style.display = "none" : ""
      ))
    }
  }
  setRenderTrigger("ok");

  //abbinamento icone
  let url;
  apiIconData.map( icon =>(
    icon.asset_id == id ? url=icon.url : ""
  ));
/*
  if (url === undefined){
    if(cryptoinfo_div != null){
      cryptoinfo_div.style.display = "none";
    }
  }
*/

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

  let volume1hrs_int = parseInt(volume1hrs);
  let volume1day_int = parseInt(volume1day);
  let volume1mth_int = parseInt(volume1mth);

  let volume1hrs_final = MoneyFormat(volume1hrs_int);
  let volume1day_final = MoneyFormat(volume1day_int);
  let volume1mth_final = MoneyFormat(volume1mth_int);


  return (
      <div className="crypto" id={id} >
        <div className="crypto_name" onClick={OpenCryptoInfo}>
          <img className="crypto_icon" src={url}/>
          <p className="name">{name} </p>
          <p className="id">{id} </p>
        </div>

        <div className="crypto_data" onClick={OpenCryptoInfo}>
          <p className="volume1day">$ {volume1day_final}</p>
          <p className="volume1mth">$ {volume1mth_final}</p>
          {price === "undefined" ? <p>Not Available</p> : <p>$ {parseFloat(price).toLocaleString(undefined, {maximumFractionDigits: 2})}</p>}
        </div>
        <i className="fas fa-heart" id="heart_icon" onClick={logData}></i>
        <CryptoInfo
          id={id}
          icon_url={url}
          name={name}
          price={price}
          volume1hrs={volume1hrs_final}
          volume1day={volume1day_final}
          volume1mth={volume1mth_final}
          coinData={coinData}
        />
      </div>
  );
}

export default Crypto;
