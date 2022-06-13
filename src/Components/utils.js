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
