import axios from "axios"
import { GRAPHQL_API } from "../Graphql/queries"

export const add_removeItem = (fun, item) => {
   return fun(item)
}

export const addAttributesToCart = (att, key, input) => {
   let value
   value = att[key]
   const data = Object.assign(
      input,
      { [key + "_" + Object.values(att).toString()]: value }
   )
   return data
}

export const countCartItems = (products, id) => {
   let count = 0
   products.forEach(element => {
      if (element.id === id) {
         count += 1
      }
   })
   return count
}

export const currentPrice = (prices, currentCurrency) => {
   const price = prices.map(item => {
      return currentCurrency === item.currency.symbol && item.amount
   })
   return price
}

export const uniqProducts = (products) => {
   let uniqProducts = [...products.reduce((map, obj) =>
      map.set(obj.id, obj), new Map()).values()]
   uniqProducts = uniqProducts.sort((a, b) => {
      let fa = a.id.toLowerCase(),
         fb = b.id.toLowerCase()
      const order = fa < fb ? -1 : fa > fb ? 1 : 0
      return order
   })
   return uniqProducts
}

export const result = async (graphqlQuery, input) => {
   const queryResult = await axios.post(
      GRAPHQL_API, {
      query: graphqlQuery,
      variables: input
   })
   return queryResult.data.data
}

export const getAttributesById = (array, att) => array?.map(({ attributes }) => attributes
   .find(i => i.id === att))
   .filter(i => i !== undefined)
   ?.map(i => i.items)
   ?.map(i => i.map(e => e.id)).join(',').split(',')

export const getAttributesByValue = (array, att) => array?.map(({ attributes }) => attributes
   .find(i => i.id === att))
   .filter(i => i !== undefined)
   ?.map(i => i.items)
   ?.map(i => i.map(e => e.value)).join(',').split(',')