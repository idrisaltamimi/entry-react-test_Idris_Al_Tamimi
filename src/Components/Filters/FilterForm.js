import React, { Component } from 'react'

import History from '../../History'
import Checkbox from './Checkbox'
import Radio from './Radio'
import Select from './Select'
import { getAttributesById, getAttributesByValue } from '../utils'
import getFilterData from './getFilterData'

class Search extends Component {
  state = {
    checkbox: {
      withoutPort: false,
      withPort: false,
      withTouchId: false,
      withoutTouchId: false,
    },
    color: '',
    capacity: '',
    sizeByNumber: '',
    sizeByText: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const { checkbox, color, capacity, sizeByNumber, sizeByText } = this.state

    const category = this.props.category === 'all' ? '' : this.props.category
    const pushNewSearchValue = (value) => value !== '' && checkedProducts.push(value?.split(' ').join('_'))

    let checkedProducts = Object.entries(checkbox)
      .filter(item => item[1])
      .map(item => item[0])

    pushNewSearchValue(capacity)
    pushNewSearchValue(color.split('#')[1])
    pushNewSearchValue(sizeByNumber)
    pushNewSearchValue(sizeByText)

    checkedProducts = checkedProducts.filter(item => item !== undefined)

    if (checkedProducts.length === 0) return History.push(`/${category}`)

    History.push(`/${category}?search_query=${checkedProducts.join('&')}`)
    this.props.updateFilteredData(getFilterData(this.props.dataArr))
  }

  handleCheckboxChange = e => {
    const { name } = e.target
    this.setState(prevState => ({
      checkbox: { ...prevState.checkbox, [name]: !prevState.checkbox[name] }
    }))

  }

  handleSelectChange = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { withoutPort, withPort, withTouchId, withoutTouchId } = this.state.checkbox
    const { dataArr, category } = this.props

    const colors = [...new Set(getAttributesByValue(dataArr, 'Color'))]
    const capacity = [...new Set(getAttributesById(dataArr, 'Capacity'))]
    const sizesByNumber = []
    const sizesByText = []
    const sizes = [...new Set(getAttributesById(dataArr, 'Size'))]
    sizes.forEach(item => isNaN(parseInt(item)) ? sizesByText.push(item) : sizesByNumber.push(item))

    return (
      <form className='filters-form'>
        {category !== 'clothes' && <div className='colors-container form-item'>
          <label>Color</label>
          <div className='no-color'>
            <Radio
              color=''
              value=''
              handleChange={(e) => this.setState({ color: e.target.value })}
            />
          </div>
          {colors.map(color => (
            <Radio
              key={color}
              color={color}
              value={color}
              handleChange={(e) => this.setState({ color: e.target.value })}
            />
          ))}
        </div>}

        {category !== 'clothes' && <div className='form-item'>
          <label>With USB 3 ports</label>
          <Checkbox
            id='with-port'
            title='Yes'
            name='withPort'
            checked={withPort}
            handleChange={this.handleCheckboxChange}
          />
          <Checkbox
            id='without-port'
            title='No'
            name='withoutPort'
            checked={withoutPort}
            handleChange={this.handleCheckboxChange}
          />
        </div>}

        {category !== 'clothes' && <div className='form-item'>
          <label>Touch ID in keyboard</label>
          <Checkbox
            id='with-touch-id'
            title='Yes'
            name='withTouchId'
            checked={withTouchId}
            handleChange={this.handleCheckboxChange}
          />
          <Checkbox
            id='without-touch-id'
            title='No'
            name='withoutTouchId'
            checked={withoutTouchId}
            handleChange={this.handleCheckboxChange}
          />
        </div>}

        {category !== 'clothes' && <Select
          id='capacity'
          array={capacity}
          title='Capacity'
          name='capacity'
          handleChange={this.handleSelectChange}
        />}

        {category !== 'tech' && <Select
          id='size-by-text'
          array={sizesByText}
          title='Size By Text'
          name='sizeByText'
          handleChange={this.handleSelectChange}
        />}

        {category !== 'tech' && <Select
          id='size-by-number'
          array={sizesByNumber}
          title='Size By Number'
          name='sizeByNumber'
          handleChange={this.handleSelectChange}
        />}
      </form>
    )
  }
}

export default Search