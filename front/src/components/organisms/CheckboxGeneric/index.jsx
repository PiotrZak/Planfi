import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Holdable } from "hooks/useLongPress";
import { renderType } from "./DataTypes"
import styled from 'styled-components';

// todo- styled
const Wrapper = styled.div`
display: flex;
background: ${({ theme }) => theme.colorGray80};
padding: .7rem 0;
border-top: 1px solid ${({ theme }) => theme.colorInputBorder};
`;

export const CheckboxGenericComponent = ({
  id,
  className,
  selectAll,
  dataType,
  dataList,
  displayedValue,
  onSelect,
}) => {
  const [list, setList] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setType(dataType);
    if (dataList) setList(dataList);
  }, [dataList]);

  function handleChange(e) {

    if (isMobile) {
      e.currentTarget.nextElementSibling.checked = !e.currentTarget.nextElementSibling.checked;
    }

    var checkedItemsCount = 0;

    dataList.map((el) => {

      if (isMobile) {
        if (el[displayedValue] === e.currentTarget.nextElementSibling.name) {
          el.value = e.currentTarget.nextElementSibling.checked;
        }
      }
      else {
        if (el[displayedValue] === e.target.name) {
          el.value = e.target.checked;
        }
      }

      if (el.value) checkedItemsCount++;
      return el;
    });
    setList([...dataList]);
    onSelect([...dataList], checkedItemsCount);
  }

  function handleSelectAll(e) {
    let checkedItemsCount = 0;
    dataList.map((el) => {
      el.value = e.target.checked;
      if (el.value) checkedItemsCount++;
      return el;
    });
    setList([...dataList]);
    onSelect([...dataList], checkedItemsCount);
  }

  function renderSelectAll() {
    if (selectAll) {
      return (
        <input
          id={`select-all-checkbox-${id}`}
          label="Select All"
          className="select-all-input"
          labelWidth="10"
          inputWidth="1"
          type="checkbox"
          onChange={handleSelectAll}
        />
      );
    }
  }



  function renderRows() {
    const row = [];
    if (Array.isArray(list)) {
      dataList.map((element, i) => {
        row.push(
          <div key={i} className="checkbox-generic-list__element">
            {isMobile ?
              <Holdable
                onHold={handleChange}
                onClick={(e) => e.preventDefault()}
                id={id}
                key={id}
                for={`${element[displayedValue]}-checkbox-${id}`}
              >
                {renderType(className, type, element, i)}
              </Holdable>
              :
              <>
                {renderType(className, type, element, i)}
              </>
            }
            <input
              className="checkbox-generic-list__checkbox"
              id={`${element[displayedValue]}-checkbox-${id}`}
              name={element[displayedValue]}
              type="checkbox"
              checked={!!element.value}
              onChange={handleChange}
            />
          </div>
        );
        return element;
      });
    }
    return row;
  }
  return (
    <>
      {renderSelectAll()}
      {renderRows()}
    </>
  );
};




