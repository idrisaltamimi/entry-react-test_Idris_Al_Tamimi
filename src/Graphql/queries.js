export const GRAPHQL_API = "http://localhost:4000/"

export const GET_DATA_QUERY = `
   query{
      category{
         name
         products{
            brand
            id
            inStock
            name
            category
            gallery
            description
            prices{
               amount
               currency {
                  symbol
               }
            }
            attributes {
               id
               type
               items {
                  id
                  value
               }
            }
         }
      }
   }
`

export const GET_CURRENCY_QUERY = `
   query{
      currencies {
         label
         symbol
      }
   }
`