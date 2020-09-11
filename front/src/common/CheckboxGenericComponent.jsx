import React, { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import GenericElement from "./GenericElement/GenericElement"


export const CheckboxGenericComponent = ({
  id,
  selectAll,
  image,
  dataList, //list of objects
  displayedValue, //value to be displayed on chekbox list
  onSelect,
  initialSelected, // list of IDs - which elements should be selected initially
}) => {
  const [list, setList] = useState();
  // eslint-disable-next-line
  const [initialSelect, setInitialSelect] = useState();

  useEffect(() => {
    if (dataList) setList(dataList);
    if (initialSelected) {
      setInitialSelect(initialSelected);
      selectActive(initialSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList]);

  function handleChange(e) {
    var checkedItemsCount = 0;
    dataList.map((el) => {
      if (el[displayedValue] === e.target.name) {
        el.value = e.target.checked;
      }
      if (el.value) checkedItemsCount++;
      return el;
    });
    setList([...dataList]);
    onSelect([...dataList], checkedItemsCount);
  }

  // initially selecting selected checkboxes
  function selectActive() {
    dataList.forEach((el) => {
      if (initialSelected.includes(el.dataID)) {
        return (el.value = true);
      }
    });
  }

  function handleSelectAll(e) {
    var checkedItemsCount = 0;
    dataList.map((el) => {
      el.value = e.target.checked;
      if (el.value) checkedItemsCount++;
      return el;
    });
    setList([...dataList]);
    onSelect([...dataList], checkedItemsCount);
  }

  function renderSelectAll() {
    if (selectAll)
      return (
        <FormInput
          id={`select-all-checkbox-${id}`}
          label="Select All"
          className="select-all-input"
          labelWidth="10"
          inputWidth="1"
          type="checkbox"
          onChange={handleSelectAll}
        ></FormInput>
      );
  }

  function renderRows() {
    let row = [];
    if (Array.isArray(list))
      dataList.map((element, i) => {
        row.push(
          <div className="checkbox-generic-list__element">
            <input
              className="checkbox-generic-list__checkbox"
              id={`${element[displayedValue]}-checkbox-${id}`}
              key={`${element[displayedValue]}-checkbox-${id}`}
              name={element[displayedValue]}
              inputWidth="1"
              type="checkbox"
              checked={element.value ? true : false}
              onChange={handleChange}
            ></input>
            <GenericElement key={i} headline={element.name} image={element.files && element.files[0]} subline={`${element.series} / ${element.times}`} exercise={element} />
          </div>
        );
        return element;
      });
    return row;
  }
  return (
    <>
      {renderSelectAll()}
      {renderRows()}
    </>
  );
};
