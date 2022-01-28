
import './Home.css';
import React from 'react';

//wallpaper all format
import image from '../images/final-image.jpg';
import image1180 from '../images/final-image-1180.jpg';
import image950 from '../images/final-image-950.jpg';
import image700 from '../images/final-image-700.jpg';
import image550 from '../images/final-image-550.jpg';
import image450 from '../images/final-image-450.jpg';

import Header from "./Header";
import PreferedCrypto from "./PreferedCrypto";
import Allcrypto from "./Allcrypto";

function Home() {

  return (
    <div className="home">
      <picture >
        <source media='(max-width: 450px)'
                srcset={image450}/>
        <source media='(max-width: 550px)'
                srcset={image550}/>
        <source media='(max-width: 700px)'
                srcset={image700}/>
        <source media='(max-width: 950px)'
                srcset={image950}/>
        <source media='(max-width: 1180px)'
                srcset={image1180}/>
        <img id="wallpaper" src={image} />
      </picture>

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
