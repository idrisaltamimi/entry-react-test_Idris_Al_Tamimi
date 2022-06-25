import { Component } from 'react'
import * as queries from './queries'
import { result } from '../Components/utils'

export default class FetchData extends Component {
   state = {
      productIdsArr: [],
      categoriesNames: [],
      currencySwitcherData: [],
   }

   componentDidMount() {
      const fetchData = async () => {
         const productIdsArr =
            (await result(queries.GET_PRODUCTS_IDS)).category.products

         const currencyData =
            (await result(queries.GET_CURRENCY_QUERY)).currencies

         const categoriesArr =
            (await result(queries.GET_CATEGORIES_NAMES)).categories

         this.setState({
            productIdsArr: productIdsArr,
            categoriesNames: categoriesArr,
            currencySwitcherData: currencyData,
         })
      }
      fetchData()
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.id !== this.props.id) {
         const fetchData = async () => {
            const productsArr = (await result(queries.GET_PRODUCT, { id: this.props.id })).product
            this.setState({ data: productsArr })
         }
         fetchData()
      }
   }

   render() {
      const { productIdsArr, categoriesNames, currencySwitcherData } = this.state
      return (
         this.props.children({ productIdsArr, categoriesNames, currencySwitcherData })
      )
   }
}
