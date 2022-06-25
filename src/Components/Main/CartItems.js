
import React, { Component } from 'react'
import { countCartItems, add_removeItem, currentPrice } from '../utils'

import rightArrow from "../../images/arrow-right.svg"
import leftArrow from "../../images/arrow-left.svg"
import horizontalLine from "../../images/line-horizontal.svg"
import verticalLine from "../../images/line-vertical.svg"
import Attributes from '../Attributes'

export default class CartItems extends Component {

   state = {
      radioInput: JSON.parse(localStorage.getItem("cartData")) || {},
      imageIndex: 0
   }

   componentDidMount() {
      for (let key in this.props.selectedAtt) {
         let value
         value = this.props.selectedAtt[key]
         this.setState(prevState => {
            const data = Object.assign(
               prevState.radioInput,
               { [key + "_" + Object.values(this.props.selectedAtt).toString() + "--cart"]: value }
            )
            localStorage.setItem("cartData", JSON.stringify({ ...prevState.radioInput }, data))
            return {
               radioInput: { ...prevState.radioInput }, data
            }
         })
      }
   }

   handleChange = e => {
   }

   attributes = () => this.props.attributes.map(item => {
      const componentName = "--cart"
      return (
         <Attributes
            key={item.id}
            {...this.props}
            {...this.state}
            {...{ item, componentName }}
            handleChange={this.handleChange}
         />
      )
   })

   prevImage = () => {
      this.setState(prevState => ({
         imageIndex: prevState.imageIndex === 0 ? this.props.gallery.length - 1 : prevState.imageIndex - 1
      }))
   }

   nextImage = () => {
      this.setState(prevState => ({
         imageIndex: prevState.imageIndex === this.props.gallery.length - 1 ? 0 : prevState.imageIndex + 1
      }))
   }
   render() {
      const { checkOutProducts, id, getCheckedProducts, getRemovedProduct, gallery, currentCurrency, prices } = this.props
      const { imageIndex } = this.state
      return (
         <div>
            <div className='product-list--cart'>
               <section>
                  <h2 className='product-name--cart'>
                     <span className='bold-span--cart'>{this.props.brand}</span>
                     {this.props.name}
                  </h2>
                  <p className='product-price--cart'>{currentCurrency} {currentPrice(prices, currentCurrency)}</p>
                  {this.attributes()}
               </section>
               <section className='product-count--cart'>
                  <div className='product-count'>
                     <button className='plus-btn' onClick={() => add_removeItem(getCheckedProducts, checkOutProducts)}>
                        <img src={horizontalLine} alt='' className='line' />
                        <img src={verticalLine} alt='' className='line' />
                     </button>
                     <p>{countCartItems(checkOutProducts, id)}</p>
                     <button className='minus-btn' onClick={() => add_removeItem(getRemovedProduct, checkOutProducts)}>
                        <img src={horizontalLine} alt='' className='line' />
                     </button>
                  </div>
                  <div className='product-img-container'>
                     <img src={gallery[imageIndex]} alt='' className='product-img--cart' />
                     {this.props.gallery.length > 1 &&
                        <div className='product-img-scroll'>
                           <button onClick={this.prevImage} className="left-btn">
                              <img src={leftArrow} alt='' className='left' />
                           </button>
                           <button onClick={this.nextImage}
                              className="right-btn">
                              <img src={rightArrow} alt='' className='right' />
                           </button>
                        </div>
                     }
                  </div>
               </section>
            </div>
         </div>
      )
   }
}
