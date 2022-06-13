import React, { Component } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { currentPrice, uniqProducts } from '../utils'

import Home from './Home'
import Cart from "./Cart"
import Pdp from "./Pdp"
import HomeProducts from './HomeProducts'
import CartItems from './CartItems'

import cartIconWhite from "../../images/icon-cart-white.svg"

export default class Main extends Component {

   state = {
      displayCartBtn: true,
   }

   productsCards = (data) => {
      const { currentCurrency } = this.props
      const productsCards = data.map(item => {
         return (
            <div className='product-card-continer' key={item.id}>
               <Link to={`/product/${item.id}`}
                  className="product-card-link">
                  <HomeProducts
                     {...item}
                     currentCurrency={currentCurrency}
                  />
               </Link>

               {item.inStock &&
                  <button
                     className='cart-btn divoverlap buttonoverlap'
                     onClick={() => this.addToCartBtn(item)}>
                     <img src={cartIconWhite} alt='' className=' cart-icon-white' />
                  </button>
               }
            </div >
         )
      })
      return productsCards
   }

   addToCartBtn = (item) => {
      const attValues = item.attributes.map((e) => e.items.find((i, index) => index === 0 && i.id).value)
      const attObj = item.attributes.map((e) => (
         { [e.id + "_" + item.id]: (e.items.find((i, index) => index === 0 && i.id).value) }
      ))
      const newArray = { ...item }
      return item.inStock && this.props.getCheckedProducts(
         Object.assign(newArray, {
            "id": item.id + "_" + attValues,
            "selectedAtt": Object.assign({}, ...attObj)
         }))
   }

   cartProducts = () => {
      const { checkOutProducts, currentCurrency } = this.props
      const productsCards = uniqProducts(checkOutProducts).map(item => {
         return (
            <CartItems
               key={item.id}
               {...item}
               {...this.props}
               product={item}
               currentPrice={currentPrice(item.prices, currentCurrency)}
               getCheckedProducts={() => this.props.getCheckedProducts(item)}
               getRemovedProduct={() => this.props.getRemovedProduct(item)}
            />)
      })
      return productsCards
   }

   productDetailPageRoutes = () => {
      const routes = this.props.products.map(item => {
         return <Route
            key={item.id}
            path={`/product/${item.id}`}
            element={<Pdp
               {...item}
               {...this.props}
               productData={item}
            />}
         />
      })
      return routes
   }

   render() {
      const { categoriesNames, homeCategory } = this.props
      return (
         <main>
            <Routes>
               {categoriesNames.map(item => {
                  const path = item === homeCategory ? "/" : `/${item}`
                  return <Route key={item} path={path} element={
                     <Home category={item}
                        {...this.props}
                        productsCards={this.productsCards} />}
                  >
                  </Route>
               })}

               {this.productDetailPageRoutes()}

               <Route path='/cart' element={<Cart
                  {...this.props}
                  cartProducts={this.cartProducts()}
               />}
               />

               <Route path='*' element={<h1> </h1>} />
            </Routes>
         </main>
      )
   }
}
