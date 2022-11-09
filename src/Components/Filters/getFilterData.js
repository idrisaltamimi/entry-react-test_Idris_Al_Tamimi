import History from '../../History'
import { getAttributesById, getAttributesByValue } from "../utils"

const getFilterData = (data) => {
  const searchParamsUrl = History.location.search?.split('=')[1]?.split('&')
  if (searchParamsUrl === undefined) return


  const colors = [...new Set(getAttributesByValue(data, 'Color'))]
  const capacity = [...new Set(getAttributesById(data, 'Capacity'))]
  const sizesByNumber = []
  const sizesByText = []
  const sizes = [...new Set(getAttributesById(data, 'Size'))]

  sizes.forEach(item => isNaN(parseInt(item)) ? sizesByText.push(item) : sizesByNumber.push(item))
  let filterData = data

  searchParamsUrl.forEach(value => {
    const newValue = value.split('_').join('')

    const colorCurrentValue = selectedValue(colors, `#${newValue}`)
    const capacityCurrentValue = selectedValue(capacity, newValue)
    const sizeByTextCurrentValue = selectedValue(sizesByText, newValue)
    const sizeByNumberCurrentValue = selectedValue(sizesByNumber, newValue)

    switch (newValue) {
      case 'withPort':
        return filterData = filterByAttribute('Yes', filterData, 'With USB 3 ports', 'id')
      case 'withoutPort':
        return filterData = filterByAttribute('No', filterData, 'With USB 3 ports', 'id')
      case 'withTouchId':
        return filterData = filterByAttribute('Yes', filterData, 'Touch ID in keyboard', 'id')
      case 'withoutTouchId':
        return filterData = filterByAttribute('No', filterData, 'Touch ID in keyboard', 'id')
      case colorCurrentValue.split('#')[1]:
        return filterData = filterByAttribute(colorCurrentValue, filterData, 'Color', 'value')
      case capacityCurrentValue:
        return filterData = filterByAttribute(capacityCurrentValue, filterData, 'Capacity', 'id')
      case sizeByTextCurrentValue:
        return filterData = filterByAttribute(sizeByTextCurrentValue, filterData, 'Size', 'id')
      case sizeByNumberCurrentValue:
        return filterData = filterByAttribute(sizeByNumberCurrentValue, filterData, 'Size', 'id')
      default:
        break
    }
  })

  return filterData
}

export default getFilterData

const filterByAttribute = (attribute, data, id, attributeType) => (data.filter(item => item.attributes.length)
  .filter(item => item.attributes
    .some(i => i.id === id && i.items
      .some(e => e[attributeType] === attribute
      )
    )
  )
)

const selectedValue = (array, value) => array.includes(value) ? value : ''