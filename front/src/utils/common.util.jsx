export const commonUtil = {
  getCheckedData,
  getUnique,
};

function filteringArraysScopes(allElements, removeElementsFromList) {
  return allElements.filter((el) => !removeElementsFromList.includes(el));
}

function getCheckedData(selectedData, type) {
  const selectedItems = selectedData
    .filter((el) => el.value === true)
    .map((a) => a[type]);

  const unSelectedItems = selectedData
    .filter((el) => el.value === false || !el.value)
    .map((a) => a[type]);

  return filteringArraysScopes(selectedItems, unSelectedItems);
}

function getUnique(arr, index) {
  const unique = arr
       .map(e => e[index])
       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);      

   return unique;
}

export default commonUtil;
