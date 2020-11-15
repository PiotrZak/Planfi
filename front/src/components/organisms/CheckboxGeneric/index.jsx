import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Holdable } from "hooks/useLongPress";
import { renderType } from "./DataTypes"
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';

const CheckboxContainer = styled.div`
input{
  margin:-5rem 0 0 1.4rem;
  position: absolute;
  @media only screen and ${breakPointSize.xs} {
    display:none;
  }
}
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
    dataList.map((el) => {
      {el.value = null;}
      return el;
    });
    
    setType(dataType);
    setList(dataList);
  }, [dataList,]);

  function handleChange(e) {

    var checkedItemsCount = 0;
    dataList.map((el) => {
      if (isMobile) {
        if (el[displayedValue] === e.currentTarget.getAttribute('name')) {el.value = !e.currentTarget.checked;}
      }
      else {
        if (el[displayedValue] === e.target.name) {el.value = e.target.checked;}
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
          <>
            {isMobile ?
              <Holdable
                name={element[displayedValue]}  
                onHold={handleChange}
                onClick={(e) => e.preventDefault()}
                key={id}
                forx={element[displayedValue]}
              >
                {renderType(className, type, element, i)}
              </Holdable>
              :
              <>
                {renderType(className, type, element, i)}
                <CheckboxContainer>
                  <input
                    id={`${element[displayedValue]}-checkbox-${id}`}
                    name={element[displayedValue]}
                    type="checkbox"
                    checked={!!element.value}
                    onChange={handleChange}
                  />
                </CheckboxContainer>
              </>
            }
          </>
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




