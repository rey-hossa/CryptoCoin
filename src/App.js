
import './App.css';
import {BrowserRouter as Router, Routes as Switch, Route} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Home from "./components/Home";
import Allcrypto from "./components/Allcrypto";

export const Context = React.createContext();

function App() {

  const [apiData, setApiData] = useState([]);
  const [apiIconData, setApiIconData] = useState([]);
  const [search, setSearch] = useState(''); // User input in the search bar

  const [listElements,setListElements] = useState(20); // number of crypto displayed
  const [preferedList, setPreferedList] = useState([]); // list of preferred crypto
  const [renderTrigger, setRenderTrigger] = useState("");

  function allStorage() { // take all localstorage data
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }
    return values;
  }

  const apiRequest = async () => { // fetch api data

      let apiKey;

      if (process.env.NODE_ENV == "development"){
        apiKey = process.env.REACT_APP_API_KEY;

      }else if (process.env.NODE_ENV == "production"){

        let netlify_key = await axios.get("/.netlify/functions/lambda");
        apiKey = netlify_key.data;
      }

      let uri = "https://rest.coinapi.io/v1/assets";

      try{

        const response = await fetch(uri, {
          method: 'GET',
          headers: {'X-CoinAPI-Key': apiKey}
        });
        let resJson = await response.json(); //extract JSON from the response

        let onlyCryptoArray = [];
        resJson.map(coin =>(
          coin.type_is_crypto == 0 ? "" : onlyCryptoArray.push(coin)
        ))

        setApiData(onlyCryptoArray);

      }catch(error){
      console.error(error);
      }
  }

  const apiIconRequest = async () => { // fetch crypto icons

      let apiKey;
      if (process.env.NODE_ENV == "development"){
        apiKey = process.env.REACT_APP_API_KEY;
      }else if (process.env.NODE_ENV == "production"){
        let netlify_key = await axios.get("/.netlify/functions/lambda");
        apiKey = netlify_key.data;
      }

      let uri = "https://rest.coinapi.io/v1/assets/icons/512";

      try{

        const response = await fetch(uri, {
          method: 'GET',
          headers: {'X-CoinAPI-Key': apiKey}
        });
        const resJson = await response.json(); //extract JSON from the response

        setApiIconData(resJson);

      }catch(error){
      console.error(error);
      }
  }

  useEffect(() => {

    apiRequest();
    apiIconRequest();

    let allLocaleStorage = allStorage();
    setPreferedList(allLocaleStorage);

  },[]);


  return (
    <div className="App">

      <Context.Provider value={
        {
          apiDataState:[apiData, setApiData],
          apiIconDataState:[apiIconData, setApiIconData],
          searchState:[search, setSearch],
          listElementsState:[listElements, setListElements],
          preferedListState:[preferedList, setPreferedList],
          renderTriggerState:[renderTrigger,setRenderTrigger]
        }
      }>
        <Home/>
      </Context.Provider>

    </div>
  );
}

export default App;
