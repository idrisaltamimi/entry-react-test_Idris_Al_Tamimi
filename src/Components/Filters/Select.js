import React, { Component } from 'react'

export default class Select extends Component {
  render() {
    const { array, name, handleChange, id, title } = this.props

    return (
      <div className='form-item'>
        <label htmlFor={id}>{title}</label>
        <select onChange={handleChange} name={name} id={id}>
          <option value=''>All</option>
          {array?.map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
    )
  }
}
