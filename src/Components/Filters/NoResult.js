import React, { Component } from 'react'

import './styles.css'

export default class NoResult extends Component {
  render() {
    return (
      <div className='no-product-container'>
        <h1 className='no-product-title'>No Products Found</h1>
        <h3 className='no-product-subtitle'>We couldn't find what you're looking for</h3>
      </div>
    )
  }
}
