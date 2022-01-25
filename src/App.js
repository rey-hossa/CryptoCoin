
import './App.css';
import {BrowserRouter as Router, Routes as Switch, Route} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Home from "./components/Home";
import Allcrypto from "./components/Allcrypto";

export const Context = React.createContext();

// rey rh apiKey: 61114BD0-03E1-4B3D-8672-08970E4A0F0C
// rey 99 apiKey: 9B2D9669-81AA-4EEB-942E-AD0EC433CAA7

// temp apiKey: 982AAB81-ABBE-4A49-8A79-99E3C2D0A769
// temp apiKey: 73D3F28C-61C6-41B7-B49A-5402A31445AA

// temp apiKey: C82CEC8A-91CA-47E8-B491-5B224995B64D

function App() {

  const [apiData, setApiData] = useState([]);
  const [apiIconData, setApiIconData] = useState([]);
  const [search, setSearch] = useState('');

  const [listElements,setListElements] = useState(20);
  const [preferedList, setPreferedList] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState("");

  function allStorage() {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }
    return values;
  }

  const apiRequest = async () => {

      let resJson;

      if (process.env.NODE_ENV == "development"){
        let apiKey = process.env.REACT_APP_API_KEY;
        let uri = "https://rest.coinapi.io/v1/assets";

        const response = await fetch(uri, {
          method: 'GET',
          headers: {'X-CoinAPI-Key': apiKey}
        });
        resJson = await response.json(); //extract JSON from the response
      }else{
        data = await axios.get("/.netlify/functions/lambda");
        resJson = await data.data;
      }


      let onlyCryptoArray = [];
      resJson.map(coin =>(
        coin.type_is_crypto == 0 ? "" : onlyCryptoArray.push(coin)
      ))

      setApiData(onlyCryptoArray);
  }

  const apiIconRequest = async () => {
      //let apiKey = "61114BD0-03E1-4B3D-8672-08970E4A0F0C";
      let uri = "https://rest.coinapi.io/v1/assets/icons/512";

      const response = await fetch(uri, {
        method: 'GET',
        headers: {'X-CoinAPI-Key': '9B2D9669-81AA-4EEB-942E-AD0EC433CAA7'}
      });
      const resJson = await response.json(); //extract JSON from the response
      console.log(resJson);

      setApiIconData(resJson);
  }

  useEffect(() => {

    apiRequest();
    apiIconRequest();

    let allLocaleStorage = allStorage();
    setPreferedList(allLocaleStorage);

/*
    if(allLocaleStorage.length != 0){
      allLocaleStorage.map(coin => (
        coin.asset_id == null ? "" : document.getElementById(coin.asset_id).style.display = "none"
      ))
    }
*/


  },[]);

    //localStorage.setItem('prova2','provaa');
    //localStorage.removeItem('apiDataLS');
    //console.log(localStorage.length);
    //localStorage.setItem('apiData',JSON.stringify(apiData));
    //console.log(JSON.parse(localStorage.getItem("apiData")));

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
      {/*<Router>
          <Switch>
            <Route exact path="/" element={<Home/>} />
          </Switch>
        </Router>
        */}
        </Context.Provider>

    </div>
  );
}

export default App;
