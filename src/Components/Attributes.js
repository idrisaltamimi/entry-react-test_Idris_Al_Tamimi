import React, { Component } from 'react'

export default class Attributes extends Component {
   render() {
      const { item, componentName } = this.props
      const name = item.id + "_" + this.props.id + componentName
      const id = element => item.id + this.props.id + element.value
      const attContainer = item.type === "text" ? `size-boxes-container${componentName}` : `color-boxes-container${componentName}`
      const sttBackground = (element) => item.type === "swatch" ? element.value : ""
      const attValue = (element) => item.type === "text" ? element.value : ""
      const attbox = item.type === "text" ? `size-box${componentName}` : `color-box${componentName}`
      const labelClass = `label${componentName}`
      return (
         <div>
            <p className={labelClass}>
               {item.id}:
            </p>
            <div className={attContainer}>
               {item.items.map(element => {
                  return <div key={item.id + element.value}>
                     <input
                        type="radio"
                        id={id(element)}
                        name={name}
                        value={element.value}
                        checked={this.props.radioInput[name] === element.value}
                        onChange={e => this.props.handleChange(e)}
                     />
                     <label
                        htmlFor={id(element)}
                        className={attbox}
                        style={{ backgroundColor: sttBackground(element) }}
                     >
                        {attValue(element)}
                     </label>

                  </div>
               })}
            </div>
         </div>)
   }
}
