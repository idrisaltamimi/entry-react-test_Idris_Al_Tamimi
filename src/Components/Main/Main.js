import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { uniqProducts } from '../utils'
import Home from './Home'
import Cart from './Cart'
import Pdp from './Pdp'
import HomeProducts from './HomeProducts'
import CartItems from './CartItems'
import cartIconWhite from '../../images/icon-cart-white.svg'
import PageNotFound from '../PageNotFound'

export default class Main extends Component {

   productsCards = (data) => {
      const { currentCurrency } = this.props
      return data.map(item => {
         return (
            <div className='product-card-continer' key={item.id}>
               <Link to={`/product/${item.id}`}
                  className='product-card-link'>
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
            </div>
         )
      })
   }

   addToCartBtn = (item) => {
      const attValues = item.attributes.map((e) => e.items.find((i, index) => index === 0 && i.id).value)
      const attObj = item.attributes.map((e) => (
         { [e.id + '_' + item.id]: (e.items.find((i, index) => index === 0 && i.id).value) }
      ))
      const newArray = { ...item }
      return item.inStock && this.props.getCheckedProducts(
         Object.assign(newArray, {
            'id': item.id + '_' + attValues,
            'selectedAtt': Object.assign({}, ...attObj)
         }))
   }

   cartProducts = () => {
      const { checkOutProducts } = this.props
      const productsCards = uniqProducts(checkOutProducts).map(item => {
         return (
            <CartItems
               key={item.id}
               {...item}
               {...this.props}
               getCheckedProducts={() => this.props.getCheckedProducts(item)}
               getRemovedProduct={() => this.props.getRemovedProduct(item)}
            />)
      })
      return productsCards
   }

   render() {
      const { categoriesNames, productIdsArr } = this.props
      return (
         <main>
            <Switch>
               {categoriesNames.map((category, index) => (
                  <Route
                     key={category.name}
                     path={index === 0 ? '/' : `/${category.name}`}
                     exact={index === 0 ? true : false}
                  >
                     <Home
                        category={category.name}
                        {...this.props}
                        productsCards={this.productsCards}
                     />
                  </Route>
               )
               )}

               {productIdsArr.map(item => (
                  <Route key={item.id} path={`/product/${item.id}`}>
                     <Pdp id={item.id} {...this.props} />
                  </Route>
               ))}

               <Route path='/cart'>
                  <Cart {...this.props}
                     cartProducts={this.cartProducts()}
                  />
               </Route>

               <Route path='*'>
                  <PageNotFound {...{ categoriesNames, productIdsArr }} />
               </Route>
            </Switch>
         </main >
      )
   }
}
