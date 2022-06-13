import React, { Component } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

export default class Currency extends Component {

   render() {
      const { hideCurrencySwitcher, showCurrencySwitcher, currentCurrency,
         switchArrow, currencySwitcher, currencyList
      } = this.props
      return (
         <OutsideClickHandler onOutsideClick={hideCurrencySwitcher}>
            <div className='currency-switcher--header' >
               <div className='currency--header' onClick={showCurrencySwitcher}>
                  <span>{currentCurrency}</span>
                  <img src={switchArrow} alt='' />
               </div>
               {currencySwitcher &&
                  <div className='currency-toggle'>
                     {currencyList}
                  </div>}
            </div>
         </OutsideClickHandler>
      )
   }
}
