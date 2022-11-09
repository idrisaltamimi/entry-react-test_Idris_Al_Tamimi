import React, { Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const { id, title, name, handleChange, checked, value } = this.props
    return (
      <div>
        <label className='checkbox-label'>
          <input
            id={id}
            type='checkbox'
            value={value}
            name={name}
            onChange={handleChange}
            checked={checked}
          />
          {title}
        </label>
      </div>
    )
  }
}
