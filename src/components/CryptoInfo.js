
import './CryptoInfo.css';
import graphic from '../images/graphic3.PNG';

function CryptoInfo({id, icon_url, name, price, volume1hrs, volume1day, volume1mth, coinData}) {

  let id_info = id + "_info";

  function CloseCryptoInfo(){ // al click sulla cripto si apre la sezione informazioni
    let cryptoinfo_div = document.getElementById(id_info);
    cryptoinfo_div.style.display = "none";
  }

  let data_start = new Date (coinData.data_start);
  let data_end = new Date (coinData.data_end);

  let data_orderbook_start = new Date (coinData.data_orderbook_start);
  let data_orderbook_end = new Date (coinData.data_orderbook_end);

  let data_quote_start = new Date (coinData.data_quote_start);
  let data_quote_end = new Date (coinData.data_quote_end);

  let data_trade_start = new Date (coinData.data_trade_start);
  let data_trade_end = new Date (coinData.data_trade_end);

  return (
    <div className="cryptoinfo" id={id_info} >
      <div className="cryptoinfo_section">

        <div className="back_button_div">
          <button class="back_button" onClick={CloseCryptoInfo}><i class="fas fa-times"></i></button>
        </div>

        <div className="cryptoinfo_data">

          <div className="cryptoinfo_data_prices">
            <div className="cryptoinfo_data_price">
              <div className="cryptoinfo_data_name" >
                <img src={icon_url} />
                <h2>{name}</h2>
              </div>
              {price === "undefined" ? <p>Not Available</p> : <p>$ {parseFloat(price).toLocaleString(undefined, {maximumFractionDigits: 4})}</p>}
              <img id="grafic" src={graphic}/>
            </div>
            <div className="cryptoinfo_data_volume cryptoinfo_volume1hrs">
              <h4>Volume 1 Hours</h4>
              <p>$ {volume1hrs}</p>
            </div>
            <div className="cryptoinfo_data_volume cryptoinfo_volume1day">
              <h4>Volume 1 Day</h4>
              <p>$ {volume1day}</p>
            </div>
            <div className="cryptoinfo_data_volume cryptoinfo_volume1mth">
              <h4>Volume 1 Month</h4>
              <p>$ {volume1mth}</p>
            </div>
          </div>

          <div className="cryptoinfo_data_other">

            <div className="cryptoinfo_data_other_date">
              <h3>Date</h3>
              <div>
                <span>
                  <h4>Start</h4>
                  <p>{data_start.toLocaleDateString("en-GB")}</p>
                </span>
                <span>
                  <h4>End</h4>
                  <p>{data_end.toLocaleDateString("en-GB")}</p>
                </span>
              </div>
            </div>

            <div className="cryptoinfo_data_other_date">
              <h3>Order</h3>
              <div>
                <span>
                  <h4>First</h4>
                  <p>{data_orderbook_start.toLocaleDateString("en-GB")}</p>
                </span>
                <span>
                  <h4>Last</h4>
                  <p>{data_orderbook_end.toLocaleDateString("en-GB")}</p>
                </span>
              </div>
            </div>

            <div className="cryptoinfo_data_other_date">
              <h3>Quote</h3>
              <div>
                <span>
                  <h4>First</h4>
                  <p>{data_quote_start.toLocaleDateString("en-GB")}</p>
                </span>
                <span>
                  <h4>Last</h4>
                  <p>{data_quote_end.toLocaleDateString("en-GB")}</p>
                </span>
              </div>
            </div>

            <div className="cryptoinfo_data_other_date">
              <h3>Trade</h3>
              <div>
                <span>
                  <h4>First</h4>
                  <p>{data_trade_start.toLocaleDateString("en-GB")}</p>
                </span>
                <span>
                  <h4>Last</h4>
                  <p>{data_trade_end.toLocaleDateString("en-GB")}</p>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CryptoInfo;
