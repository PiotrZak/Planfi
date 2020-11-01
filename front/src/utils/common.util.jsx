export const commonUtil = {
  getCheckedData,
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

export default commonUtil;
