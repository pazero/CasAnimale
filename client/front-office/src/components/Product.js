import React, { Component } from "react";

class Product extends Component {

  

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
        <div>{this.props.price}</div>
        <button>Buy it!</button>
      </div>
    );
  }
}

export default Product;
