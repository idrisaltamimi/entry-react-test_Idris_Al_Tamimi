import React, { Component } from 'react'
import { result } from '../utils'
import { GET_CATEGORY_PRODUCTS } from '../../Graphql/queries'

export default class Home extends Component {

   state = {
      dataArr: []
   }

   fetchData = async () => {
      const categoryProductsArr = (await result(GET_CATEGORY_PRODUCTS,
         { input: { "title": this.props.category } })).category.products
      this.setState({ dataArr: categoryProductsArr })
   }

   componentDidMount() {
      this.fetchData()
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.category !== this.props.category) {
         this.fetchData()
      }
   }

   render() {
      const { category, productsCards } = this.props
      return (
         <div className='category-page'>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className='flex'>
               {productsCards(this.state.dataArr)}
            </div>
         </div>
      )
   }
}
