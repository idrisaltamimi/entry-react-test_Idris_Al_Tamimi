import React, { Component } from 'react'
import FetchData from './Graphql/FetchData'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'

export default class App extends Component {
   state = {
      currencySwitcher: false,
      checkOutProducts: JSON.parse(localStorage.getItem("checkOutProducts")) || [],
      currentCurrency: localStorage.getItem("currentCurrency") || "$",
      totalPrice: localStorage.getItem("totalPrice") || 0,
   }

   componentDidUpdate(prevProps, prevState) {
      if ((prevState.checkOutProducts !== this.state.checkOutProducts)
         || (prevState.currentCurrency !== this.state.currentCurrency)) {
         localStorage.setItem("checkOutProducts", JSON.stringify(this.state.checkOutProducts))
         let total = 0
         this.state.checkOutProducts.forEach(item => {
            item.prices.forEach(price => {
               price.currency.symbol === this.state.currentCurrency &&
                  (total += price.amount)
            })
            this.setState({ totalPrice: total.toFixed(2) })
            localStorage.setItem("totalPrice", total.toFixed(2))
         })
      }
   }

   hideCurrencySwitcher = () => {
      this.setState({ currencySwitcher: false })
   }

   showCurrencySwitcher = () => {
      this.setState(prevState => ({
         currencySwitcher: !prevState.currencySwitcher
      }))
   }

   getCurrency = (item) => {
      this.setState({ currentCurrency: item.symbol })
      localStorage.setItem("currentCurrency", item.symbol)
      this.setState({ currencySwitcher: false })
   }

   getCheckedProducts = (item) => {
      this.setState(prevState => ({
         checkOutProducts: [...prevState.checkOutProducts, item]
      }))
   }

   getRemovedProduct = (item) => {
      const index = this.state.checkOutProducts.findIndex(object => {
         return object.id === item.id
      })
      this.setState(prevState => {
         const newArray = [...prevState.checkOutProducts]
         if (index !== -1) {
            newArray.splice(index, 1)
         }
         return { checkOutProducts: newArray }
      })
   }

   render() {
      return (
         <FetchData>
            {({ productIdsArr, categoriesNames, currencySwitcherData }) => (
               <div>
                  <Header
                     {...this.state}
                     {...{ categoriesNames, currencySwitcherData }}
                     hideCurrencySwitcher={this.hideCurrencySwitcher}
                     showCurrencySwitcher={this.showCurrencySwitcher}
                     getCurrency={this.getCurrency}
                     getCheckedProducts={this.getCheckedProducts}
                     getRemovedProduct={this.getRemovedProduct}
                  />

                  <Main
                     {...this.state}
                     {...{ categoriesNames, productIdsArr }}
                     getCheckedProducts={this.getCheckedProducts}
                     getRemovedProduct={this.getRemovedProduct}
                  />
               </div>
            )}
         </FetchData>
      )
   }
}
