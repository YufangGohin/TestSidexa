import React, { Component } from 'react';
import Cart from './components/Cart';
import items from './items';
import price from './price';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Your Cart</h1>
        </header>
        <Cart items={items} prices={price}/>
      </div>
    );
  }
}

export default App;
