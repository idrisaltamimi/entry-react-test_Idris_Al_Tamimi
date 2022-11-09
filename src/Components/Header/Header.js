import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import CurrencySwitcher from './CurrencySwitcher'
import Minicart from './Minicart'
import { uniqProducts } from '../utils'

import siteLogo from "../../images/logo-site.svg"
import downArrow from "../../images/arrow-down.svg"
import upArrow from "../../images/arrow-up.svg"
import MinicartItems from './MinicartItems'

export default class Header extends Component {

   minicartList = () => {
      const { checkOutProducts } = this.props
      const productsCards = uniqProducts(checkOutProducts).map(item => {
         return (
            <MinicartItems
               key={item.id}
               {...item}
               {...this.props}
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
               className={"currency-toggle-p"}
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

   render() {
      const { categoriesNames } = this.props
      const switchArrow = this.props.currencySwitcher ? upArrow : downArrow
      return (
         <header>
            <nav className='navbar--header'>
               {categoriesNames.map((category, index) => (
                  <NavLink
                     to={index === 0 ? "/" : `/${category.name}`}
                     key={category.name}
                     className="normal--nav"
                     exact activeClassName="current--nav"
                  >
                     {category.name}
                  </NavLink>
               ))}
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