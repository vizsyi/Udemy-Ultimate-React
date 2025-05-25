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
    <header>
      <h1 style={style} className="header">Fast React Pizza Co.</h1>
    </header>
  );
}

function Pizza({pizzaObj}){
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
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
  return (
    <main className="menu">
      <h2>Our menu</h2>

      <ul className="pizzas">
        {pizzaData.map(pizza => (
          <Pizza pizzaObj={pizza} key={pizza.name}/>
        ))}
      </ul>
    </main>
  );
}

function Footer (){
  const hour = new Date().getHours(),
    openHour = 12,
    closeHour = 22,
    isOpen = hour >= openHour && hour < closeHour;
  
  return (
    <footer>
      {new Date().toLocaleString()}. We're currently {isOpen ? "open":"closed"}.
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
