import React, { Component } from 'react'

export default class Radio extends Component {
  render() {
    const { id, handleChange, checked, value, color } = this.props
    return (
      <div className='color-container'>
        <input
          type="radio"
          id={id}
          name='colors'
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className='color-box-filter'
          style={{ backgroundColor: color }}
        >
        </label>

      </div>
    )
  }
}
