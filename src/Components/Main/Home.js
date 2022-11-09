import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import FilterForm from '../Filters/FilterForm'
import NoResult from '../Filters/NoResult'
import { result } from '../utils'
import { GET_CATEGORY_PRODUCTS } from '../../Graphql/queries'
import getFilterData from '../Filters/getFilterData'

class Home extends Component {
  state = {
    dataArr: [],
    filterData: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData()
    }
    else if (prevProps.location.search !== this.props.location.search) {
      if (this.props.location.search === '') return this.setState({ filterData: null })
      this.updateFilteredData(getFilterData(this.state.dataArr))
    }
  }

  updateFilteredData = (value) => this.setState({ filterData: value })

  fetchData = async () => {
    const categoryProductsArr = (await result(GET_CATEGORY_PRODUCTS,
      { input: { "title": this.props.category } })).category.products

    this.setState({ dataArr: categoryProductsArr })
    if (this.props.location.search === '') return
    this.updateFilteredData(getFilterData(categoryProductsArr))
  }

  render() {
    const { category, productsCards } = this.props
    const { filterData, dataArr } = this.state

    return (
      <div className='category-page'>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>

        <FilterForm
          category={category}
          dataArr={dataArr}
          updateFilteredData={this.updateFilteredData}
        />

        <div className='flex'>
          {filterData === null ? (
            productsCards(dataArr)
          ) : (
            filterData !== null && filterData.length === 0
          ) ? (
            <NoResult />
          ) : (
            productsCards(filterData))}
        </div>
      </div>
    )
  }
}

export default withRouter(Home)