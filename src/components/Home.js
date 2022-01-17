
import './Home.css';
import {Context} from "../App";
import React, { useContext } from 'react';

import image from '../images/final-image.jpg';

import Header from "./Header";
import PreferedCrypto from "./PreferedCrypto";
import Allcrypto from "./Allcrypto";

function Home() {

  const {apiDataState} = useContext(Context);
  const [apiData, setApiData] = apiDataState;

  return (
    <div className="home">
      <img id="wallpaper" src={image} alt="" />

      <Header/>
      <div className="image_space">
        <div className="written">
          <h2>All Crypto at your fingertips!</h2>
          <p>Keep track of your favorite cryptocurrencies in an easy way.</p>
        </div>
      </div>
      <PreferedCrypto/>
      <Allcrypto/>

    </div>
  );
}

export default Home;
