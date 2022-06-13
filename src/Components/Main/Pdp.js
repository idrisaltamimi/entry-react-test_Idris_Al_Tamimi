import React, { Component } from 'react'
import parse from 'html-react-parser'
import Attributes from '../Attributes'
import { currentPrice } from '../utils'

export default class Pdp extends Component {
   state = {
      radioInput: {},
      submitValid: false,
      focusedImage: 0,
   }

   componentDidMount() {
      window.scrollTo(0, 0)
      this.setState({ currentImage: this.props.gallery[0] || "" })
      this.props.attributes.length < 1 && this.setState({ submitValid: true })
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevState.radioInput !== this.state.radioInput) {
         Object.keys(this.state.radioInput).length === this.props.attributes.length
            && this.setState({ submitValid: true })
      }
   }

   selectedImage = (image, index) => {
      this.setState({ currentImage: image })
      this.setState({ focusedImage: index })
   }

   handleChange = e => {
      const { name, value } = e.target
      this.setState(prevState => {
         return {
            radioInput: { ...prevState.radioInput, [name]: value }
         }
      })
   }

   attributes = () => this.props.attributes.map(item => {
      const componentName = ""
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


   addToCartBtn = () => {
      const { productData, inStock, getCheckedProducts } = this.props
      const { radioInput } = this.state
      const newArray = { ...productData }
      return inStock && getCheckedProducts(
         Object.assign(newArray, {
            "id": this.props.id + "_" + Object.values(radioInput).toString(),
            "selectedAtt": radioInput
         }))
   }

   outOfStockBtn = () => {
      if (this.state.submitValid && this.props.inStock) {
         return "none"
      }
   }

   imageIconList = () => this.props.gallery.map((image, index) => {
      return <img src={image} alt='' key={index}
         className={this.state.focusedImage === index ?
            "img-scroll--pdp-img-selected" :
            "img-scroll--pdp-img"}
         onClick={() => this.selectedImage(image, index)} />
   })

   render() {
      const { prices, currentCurrency, gallery, brand, name, description } = this.props
      return (
         <div className='container--pdp'>
            <div className='img-scroll--pdp'>
               {this.imageIconList()}
            </div>
            <img
               src={this.state.currentImage || gallery[0]}
               alt='' className='product-img--pdp'
            />
            <div className='subcontainer-right--pdp'>
               <h2 className='title--pdp'>
                  <span className='bold--span'>{brand}</span>{name}
               </h2>
               {this.attributes()}
               <p className='text-label'>PRICE:</p>
               <p className='product-price--pdp'>
                  {currentCurrency} {currentPrice(prices, currentCurrency)}
               </p>
               <div className='add-btn-container' >
                  <button className='add-btn--pdp'
                     onClick={() => this.addToCartBtn()}>
                     ADD TO CART
                  </button>
                  <div className='out-of-stock' style={{ display: this.outOfStockBtn() }} />
               </div>
               <div className='product-description--pdp'>
                  {parse(description)}
               </div>
            </div>
         </div >
      )
   }
}