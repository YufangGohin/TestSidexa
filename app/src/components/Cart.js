import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Cart.css';
class Cart extends Component {
  state = {
    displayItems: [],
  }
  componentWillMount() {
    this.calculate(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.calculate(nextProps);
  }
  getDiscount(name, qty, price) {
    switch (name) {
      case 'Papaya':
        return price * (qty % 3 + Math.round(qty / 3, 0) * 2);

      default:
        return qty * price;
    }
  }
  calculate(props) {
    const { items, prices } = props;
    const tmp = items.map((a) => ({ name: a, nb: 1, price: prices[a]}));
    const uniques = tmp.reduce((a, b) => {
      a[b.name] = {
        name: b.name,
        nb: a[b.name] ? a[b.name].nb + 1 : 1,
        price: b.price,
      };
      a[b.name].price = this.getDiscount(b.name, a[b.name].nb, b.price);
      return a;
    }, {});
    this.setState({ displayItems: Object.values(uniques) });
  }
  render() {
    const { displayItems } = this.state;
    return (
      <div className="Cart" >
        {displayItems.map((item) => <div className="Cart__Item" key={item.name}><p>{item.name}</p><p>{item.nb} piece(s)</p><p>{item.price} cts</p></div>)}
        <div className="Cart__Item Cart__Item--total"><p><strong>Total :</strong></p><p>{displayItems.reduce((a, b)=> a + b.nb, 0)} piece(s)</p><p>{displayItems.reduce((a, b)=> a + b.price, 0)} cts</p></div>
      </div>
    );
  }
};

Cart.propTypes = {
  items: PropTypes.array,
  prices: PropTypes.object,
}

export default Cart;