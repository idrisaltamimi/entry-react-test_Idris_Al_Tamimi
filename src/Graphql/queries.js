export const GRAPHQL_API = "http://localhost:4000/"


export const GET_CURRENCY_QUERY = `
   query{
      currencies {
         label
         symbol
      }
   }
`

export const GET_CATEGORIES_NAMES = `
query{
   categories{
      name
   }
}
`

export const GET_PRODUCTS_IDS = `
   query{
      category{
         products{
            id
         }
      }
   }
`

export const GET_CATEGORY_PRODUCTS = `
   query getCategory($input: CategoryInput!) {
      category(input: $input){
         name
         products{
            id
            name
            category
            inStock
            gallery
            brand
            prices{
               amount
               currency{
                  symbol
               }
            }
            attributes{
               id
               type
               items{
                  value
                  id
               }
            }
         }
      }  
   }
`

export const GET_PRODUCT = `
   query getProduct($id: String!){
      product(id: $id){
         id
         name
         brand
         inStock
         gallery
         description
         prices{
            amount
            currency{
               symbol
            }
         }
         attributes{
            id
            type
            items{
               value
               id
            }
         }
      }
   }
`