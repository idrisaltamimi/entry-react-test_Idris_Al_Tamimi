import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler'

import cartIcon from "../../images/icon-cart.svg"

export default class Minicart extends Component {
   state = {
      minicart: false,
   }

   componentDidUpdate() {
      if (this.state.minicart) {
         document.body.style.overflow = "hidden"
      } else {
         document.body.style.overflow = "visible"
      }
   }

   hideMinicart = () => { this.setState({ minicart: false }) }
   showMinicart = () => {
      this.setState(prevState => ({ minicart: !prevState.minicart }))
   }


   render() {
      const itemsCount = !this.props.checkOutProducts.length === 0 ? '' : this.props.checkOutProducts.length
      const icononcart = this.props.checkOutProducts.length === 0 ? 0 : 1
      const bagStatus = itemsCount ? itemsCount + " items" : "is embty"
      const backgroundBlack = this.state.minicart ? "background-black--minicart" : ''
      const totalPrice = this.props.checkOutProducts.length === 0 ? "0.00" : this.props.totalPrice
      return (
         <OutsideClickHandler onOutsideClick={this.hideMinicart}>
            <div className='cart--header' onClick={this.showMinicart} >
               <span className='cart-counter--header' style={{ opacity: icononcart }}>
                  {itemsCount}
               </span>
               <img src={cartIcon} alt='cart logo' />
            </div>
            <div className="background--minicart">
               {this.state.minicart &&
                  <div className='container--minicart'>
                     <h3>
                        <span>My Bag</span>, {bagStatus}
                     </h3>

                     {this.props.items}

                     <div className='checkout--minicart'>
                        <div className='checkout-price-container'>
                           <p>Total</p>
                           <p>{this.props.currentCurrency} {totalPrice}</p>
                        </div>
                     </div>
                     <div className='checkout-btn-container'>
                        <NavLink to="/cart" className="bag-link" onClick={this.hideMinicart}>
                           <button className='view-bag-btn--minicart'>View bag</button>
                        </NavLink>
                        <button className='checkout-btn--minicart'>CHECK OUT</button>
                     </div>
                  </div>
               }
            </div>
            <div className={backgroundBlack} onClick={this.hideMinicart}></div>
         </OutsideClickHandler>
      )
   }
}


