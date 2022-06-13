import React, { Component } from 'react'

export default class Cart extends Component {

   render() {
      const totalPrice = this.props.checkOutProducts.length === 0 ? "0.00" : this.props.totalPrice
      const taxes = (totalPrice * 0.21).toFixed(2)
      const quantity = this.props.checkOutProducts.length
      return (
         <div className='containrt--cart'>
            <h1 className='title--cart'>CART</h1>
            {this.props.cartProducts}
            <div className='check-out--cart'>
               <p>Tax 21%: <span>{this.props.currentCurrency} {taxes}</span></p>
               <p>Quantity: <span>{quantity}</span></p>
               <p>Total: <span>{this.props.currentCurrency} {totalPrice}</span></p>
               <button>ORDER</button>
            </div>
         </div>
      )
   }
}
