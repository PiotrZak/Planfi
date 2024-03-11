import { uniqBy } from 'lodash'
import Cookies from 'js-cookie'

export const commonUtil = {
  getCheckedData,
  getUnique,
}

function filteringArraysScopes(allElements, removeElementsFromList) {
  return allElements.filter((el) => !removeElementsFromList.includes(el))
}

function getCheckedData(selectedData, type) {
  const selectedItems = selectedData
    .filter((el) => el.value === true)
    .map((a) => a[type])

  const unSelectedItems = selectedData
    .filter((el) => el.value === false || !el.value)
    .map((a) => a[type])

  return filteringArraysScopes(selectedItems, unSelectedItems)
}

function getUnique(arr, index) {
  const unique = arr
    .map((e) => e[index])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e])

  return unique
}

export const filterDataByTerm = (searchTerm, data, dataProperty) => {
  if (!searchTerm) {
    return data
  } else {
    const result = []
    let uniqueResult
    for (let i = 0; i < dataProperty.length; i++) {
      const filteredData = data.filter((x) =>
        x[dataProperty[i]]
          .toLowerCase()
          .includes(searchTerm?.toLocaleLowerCase())
      )
      result.push(...filteredData)
      uniqueResult = uniqBy(result, 'id')
    }
    return uniqueResult
  }
}

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

//export const result = Object.keys(Object.values(patients).reduce((prev, current) => ({...prev, ...current}), {}))

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export const detectBrowser = () => {
  const isFirefox = typeof InstallTrigger !== 'undefined'
  const isIE = /* @cc_on!@ */ false || !!document.documentMode
  const isEdge = !isIE && !!window.StyleMedia
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)

  if (isFirefox) {
    localStorage.setItem('browser', 'Firefox')
  }
  if (isIE) {
    localStorage.setItem('browser', 'IE')
  }
  if (isEdge) {
    localStorage.setItem('browser', 'Edge')
  }
  if (isChrome) {
    localStorage.setItem('browser', 'Chrome')
  }
}

export const bytesArrToBase64 = (arr) => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/' // base64 alphabet
  const bin = (n) => n.toString(2).padStart(8, 0) // convert num to 8-bit binary string
  const l = arr.length
  let result = ''

  for (let i = 0; i <= (l - 1) / 3; i++) {
    let c1 = i * 3 + 1 >= l // case when "=" is on end
    let c2 = i * 3 + 2 >= l // case when "=" is on end
    let chunk =
      bin(arr[3 * i]) +
      bin(c1 ? 0 : arr[3 * i + 1]) +
      bin(c2 ? 0 : arr[3 * i + 2])
    let r = chunk
      .match(/.{1,6}/g)
      .map((x, j) =>
        j == 3 && c2 ? '=' : j == 2 && c1 ? '=' : abc[+('0b' + x)]
      )
    result += r.join('')
  }

  return result
}

export const isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
  return res !== null
};

export default commonUtil
