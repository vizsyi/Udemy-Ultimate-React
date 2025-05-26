import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

import { pizzaData } from "./data.js"

function Header(){
const style = {
  /*
  color: "red",
  fontSize: "48px",
  textTransform: "uppercase"
  */
}

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Pizza({pizzaObj}){
  return (
    <li className={`pizza${pizzaObj.soldOut ? " sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

  /* {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  }, */

function Menu(){
  const numPizzas = pizzaData.length;

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
          <>
            <p>
              Authentic Italian cuisine. {numPizzas} creative dishes to choose from.
              All from our ston oven, all organic, all delicious.
            </p>
            <ul className="pizzas">
              {pizzaData.map(pizza => (
                <Pizza pizzaObj={pizza} key={pizza.name}/>
              ))}
            </ul>
          </>
        ):(
          <p>We're still working on our menu. Please come back later :)</p>
        )}

    </main>
  );
}

function Order({localDate, openHour, closeHour}){
  return (
    <div className="order">
      <p>
        {localDate}. We're open from {openHour}:00 until {closeHour}:00. Come to visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  )
}

function Footer (){
  const dt = new Date(),
    hour = dt.getHours(),
    localDate = dt.toLocaleString(),
    openHour = 12,
    closeHour = 222,
    isOpen = hour >= openHour && hour < closeHour;
  
  return (
    <footer>
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} localDate={localDate} />
      ):(
        <p>{localDate}. We're to welcome you between {openHour}:00 and {closeHour}:00.</p>
      )}
      
    </footer>
  );
}

function App(){
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18
// React.render(<App/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
