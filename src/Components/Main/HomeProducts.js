import React, { Component } from 'react'
import { currentPrice } from '../utils'

export default class HomeProducts extends Component {

   render() {
      const { prices, currentCurrency, inStock } = this.props
      const inStockClass = !inStock ? "outof-stock" : ""
      const inStockText = !inStock ? "OUT OF STOCK" : ""
      return (
         <div >
            <section className='product-card' >
               <div>
                  <img src={this.props.gallery[0]} alt='' />
                  <div className={inStockClass}>
                     <div></div>
                     <p>{inStockText}</p>
                  </div>
               </div>
               <h4>{this.props.brand} {this.props.name}</h4>
               <p>{this.props.currentCurrency} {currentPrice(prices, currentCurrency)}</p>
            </section>
         </div>
      )
   }
}
