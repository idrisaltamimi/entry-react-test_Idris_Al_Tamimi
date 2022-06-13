import React, { Component } from 'react'
import Attributes from '../Attributes'
import { add_removeItem, countCartItems } from '../utils'

import horizontalLineSmall from "../../images/line-horizontal-small.svg"
import verticalLineSmall from "../../images/line-vertical-small.svg"

export default class MinicartItems extends Component {
   state = {
      radioInput: JSON.parse(localStorage.getItem("minicartData")) || {},
   }

   componentDidMount() {
      for (let key in this.props.selectedAtt) {
         let value
         value = this.props.selectedAtt[key]
         this.setState(prevState => {
            const data = Object.assign(
               prevState.radioInput,
               { [key + "_" + Object.values(this.props.selectedAtt).toString() + "--minicart"]: value }
            )
            localStorage.setItem("minicartData", JSON.stringify({ ...prevState.radioInput }, data))
            return {
               radioInput: { ...prevState.radioInput }, data
            }
         })
      }
   }


   handleChange = e => {
   }

   attributes = () => this.props.attributes.map(item => {
      const componentName = "--minicart"
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

   render() {
      const { getCheckedProducts, checkOutProducts, getRemovedProduct, id } = this.props
      localStorage.setItem("minicartData", JSON.stringify(this.state.radioInput))
      return (
         <div className='product-list--minicart' >
            <section className='left-side--minicart'>
               <h2 className='product-name--minicart'>
                  <span>{this.props.brand} </span>{this.props.name}
               </h2>
               <p className='product-price--minicart'>
                  {this.props.currentCurrency} {this.props.currentPrice}
               </p>
               {this.attributes()}
            </section>
            <section className='product-count--minicart'>
               <div className='count--minicart'>
                  <button className='plus-btn--minicart' onClick={() => add_removeItem(getCheckedProducts, checkOutProducts)}>
                     <img src={horizontalLineSmall} alt='' className='line--minicart' />
                     <img src={verticalLineSmall} alt='' className='line--minicart' />
                  </button>
                  <p>{countCartItems(checkOutProducts, id)}</p>
                  <button className='minus-btn--minicart' onClick={() => add_removeItem(getRemovedProduct, checkOutProducts)} >
                     <img src={horizontalLineSmall} alt='' className='line--minicart' />
                  </button>
               </div>
               <img src={this.props.gallery[0]} alt='' className='product-img--minicart' />
            </section>
         </div>
      )
   }
}

