import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import CurrencySwitcher from './CurrencySwitcher'
import Minicart from './Minicart'
import { currentPrice, uniqProducts } from '../utils'

import siteLogo from "../../images/logo-site.svg"
import downArrow from "../../images/arrow-down.svg"
import upArrow from "../../images/arrow-up.svg"
import MinicartItems from './MinicartItems'

export default class Header extends Component {
   minicartList = () => {
      const { checkOutProducts, currentCurrency } = this.props
      const productsCards = uniqProducts(checkOutProducts).map(item => {
         return (
            <MinicartItems
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

   currencyList = () => {
      const currencyList = this.props.currencySwitcherData.map(item => {
         return (
            <p key={item.label}
               onClick={() => this.currencySwitcherBtn(item)}
               className={item.symbol === this.props.currentCurrency ?
                  "focused-currency" : "currency-toggle-p"}
            >
               {item.symbol} {item.label}
            </p>
         )
      })
      return currencyList
   }

   currencySwitcherBtn = item => {
      return this.props.getCurrency(item)
   }

   activeCategory = ({ isActive }) => isActive ? "current--nav" : "normal--nav"

   navLinks = () => this.props.categoriesNames.map(category => {
      const path = category === this.props.homeCategory ? "/" : `/${category}`
      return <NavLink
         key={category} to={path}
         className={this.activeCategory}>
         {category}
      </NavLink>
   })

   render() {
      const switchArrow = this.props.currencySwitcher ? upArrow : downArrow
      return (
         <header>
            <nav className='navbar--header'>
               {this.navLinks()}
            </nav>

            <img src={siteLogo} alt='site logo' className="site-logo--header" />

            <div className='right--header'>
               <CurrencySwitcher
                  {...this.props}
                  currencyList={this.currencyList()}
                  switchArrow={switchArrow}
               />
               <Minicart
                  {...this.props}
                  items={this.minicartList()}
                  getMinicartStatus={this.getMinicartStatus}
               />
            </div>
         </header >
      )
   }
}