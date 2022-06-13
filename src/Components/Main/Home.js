import React, { Component } from 'react'

export default class Home extends Component {

   render() {
      const { category, productsCards, products, homeCategory } = this.props
      const data = products.map(item => {
         return item.category === category ? item : category === homeCategory && item
      }).filter(e => e !== false)
      return (
         <div className='category-page'>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className='flex'>
               {productsCards(data)}
            </div>
         </div>
      )
   }
}
