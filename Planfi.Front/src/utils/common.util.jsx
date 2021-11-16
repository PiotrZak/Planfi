import { uniqBy } from 'lodash';
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

export const filterDataByTerm = (searchTerm, data, dataProperty) => {
	if (!searchTerm) {
		return data;
	} else {
		const result = [];
		let uniqueResult;
		for (let i = 0; i < dataProperty.length; i++) {
			const filteredData = data.filter((x) =>
				x[dataProperty[i]].toLowerCase().includes(searchTerm?.toLocaleLowerCase()),
			);
			result.push(...filteredData);
			uniqueResult = uniqBy(result, 'id');
		}
		return uniqueResult;
	}
};

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

//export const result = Object.keys(Object.values(patients).reduce((prev, current) => ({...prev, ...current}), {}))

export const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default commonUtil;

