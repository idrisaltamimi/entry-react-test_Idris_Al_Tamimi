import React, { Component } from 'react'
import parse from 'html-react-parser'
import Attributes from '../Attributes'
import { currentPrice } from '../utils'
import { result } from '../utils'
import { GET_PRODUCT } from '../../Graphql/queries'

export default class Pdp extends Component {
   state = {
      data: {},
      radioInput: {},
      submitValid: false,
      focusedImage: 0,
   }

   fetchData = async () => {
      const productsArr = (await result(GET_PRODUCT, { id: this.props.id })).product
      this.setState({ data: productsArr })
   }

   componentDidMount() {
      this.fetchData()
      window.scrollTo(0, 0)
   }

   componentDidUpdate(prevProps, prevState) {
      const { data } = this.state
      if (prevState.data !== this.state.data) {
         this.setState({ currentImage: data.gallery[0] })
         data.attributes.length < 1 && this.setState({ submitValid: true })
      }
      if (prevState.radioInput !== this.state.radioInput) {
         Object.keys(this.state.radioInput).length === data.attributes.length
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

   attributes = () => this.state.data.attributes.map(item => {
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
      const { data, radioInput } = this.state
      const { getCheckedProducts } = this.props
      const newArray = { ...data }
      return data.inStock && getCheckedProducts(
         Object.assign(newArray, {
            "id": this.props.id + "_" + Object.values(radioInput).toString(),
            "selectedAtt": radioInput
         }))
   }

   outOfStockBtnClass = () => {
      const { data } = this.state
      return this.state.submitValid && data.inStock ?
         "out-of-stock-true" : "out-of-stock"
   }

   imageIconList = () => this.state.data.gallery.map((image, index) => {
      return <img src={image} alt='' key={index}
         className={this.state.focusedImage === index ?
            "img-scroll--pdp-img-selected" :
            "img-scroll--pdp-img"}
         onClick={() => this.selectedImage(image, index)} />
   })

   render() {
      const { data } = this.state
      const { currentCurrency } = this.props
      return (
         <div>
            {(data.gallery || data.name) && <div className='container--pdp'>
               <div className='img-scroll--pdp'>
                  {this.imageIconList()}
               </div>
               <img
                  src={this.state.currentImage || data.gallery[0]}
                  alt='' className='product-img--pdp'
               />
               <div className='subcontainer-right--pdp'>
                  <h2 className='title--pdp'>
                     <span className='bold--span'>{data.brand}</span>{data.name}
                  </h2>
                  {this.attributes()}
                  <p className='text-label'>PRICE:</p>
                  <p className='product-price--pdp'>
                     {currentCurrency} {currentPrice(data.prices, currentCurrency)}
                  </p>
                  <div className='add-btn-container' >
                     <button className='add-btn--pdp'
                        onClick={() => this.addToCartBtn()}>
                        ADD TO CART
                     </button>
                     <div className={this.outOfStockBtnClass()} />
                  </div>
                  <div className='product-description--pdp'>
                     {parse(data.description)}
                  </div>
               </div>
            </div >}
         </div>
      )
   }
}