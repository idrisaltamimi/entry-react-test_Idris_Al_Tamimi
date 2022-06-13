import { Component } from 'react'
import * as queries from './queries'
import axios from 'axios'

export default class FetchData extends Component {
   state = {
      allData: [],
      categoriesNames: [],
      currencySwitcherData: [],
   }

   componentDidMount() {
      const fetchData = async () => {
         const queryResult = await axios.post(
            queries.GRAPHQL_API, {
            query: queries.GET_DATA_QUERY
         })

         const queryCurrency = await axios.post(
            queries.GRAPHQL_API, {
            query: queries.GET_CURRENCY_QUERY
         })

         const resultData = queryResult.data.data.category
         const categories = queryResult.data.data.category.products.map(i => i.category)
         const currencyData = queryCurrency.data.data.currencies

         const categoriesNames = categories.filter((e, index) => (
            categories.indexOf(e) === index
         ))
         const categoryArray = [resultData.name].concat(categoriesNames)
         this.setState({
            allData: resultData,
            categoriesNames: categoryArray,
            currencySwitcherData: currencyData,
         })
      }
      fetchData()
   }

   render() {
      const { allData, categoriesNames, currencySwitcherData } = this.state
      return (
         this.props.children({ allData, categoriesNames, currencySwitcherData })
      )
   }
}
