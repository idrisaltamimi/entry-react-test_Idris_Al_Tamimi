import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PageNotFound extends Component {
   render() {
      const { categoriesNames, productIdsArr } = this.props
      const arePageDataLoading = (productIdsArr.length === 0 || categoriesNames.length === 0)

      return (
         <div>
            {arePageDataLoading ? "" :
               <div className='page-not-found-container'>
                  <h1 className='page-not-found'>Page Not Found</h1>
                  <Link to="/" className='not-found-link'>Return To Homepage</Link>
               </div>
            }
         </div>
      )
   }
}
