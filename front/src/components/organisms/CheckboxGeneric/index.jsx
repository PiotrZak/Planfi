import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Holdable } from 'hooks/useLongPress';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import Checkbox, { CHECKBOX_TYPE } from 'components/atoms/Checkbox';
import { useUserContext } from 'support/context/UserContext';

const CheckboxContainer = styled.div`
  position: relative;
  input{
    z-index: 0;
    position: absolute;
    top: -6rem;
    left: -5rem;
    &:hover {
      cursor:pointer;
    }
    @media only screen and ${breakPointSize.xs} {
      display: none;
    }
  }
`;

const CheckboxLightContainer = styled.div`
  input{
    margin: -6rem 0 0 1.6rem;
    z-index:2;
    position: absolute;
    &:hover {
      cursor:pointer;
    }
    @media only screen and ${breakPointSize.xs} {
      display: none;
    }
}
`;

export const CheckboxGenericComponent = ({
  id,
  selectAll,
  theme,
  dataType,
  dataList,
  displayedValue,
  onSelect,
}) => {
  const [list, setList] = useState();
  const [type, setType] = useState();
  const { user } = useUserContext();

  useEffect(() => {
    dataList.map((el) => {
      { el.value = false; }
      return el;
    });
    setType(dataType);
    setList(dataList);
  }, [dataList]);

  function handleChange(e) {
    dataList.map((el) => {
      if (isMobile) {
        if (el[displayedValue] === e.currentTarget.getAttribute('name')) {
          el.value = !el.value;
        }
      } else if (el[displayedValue] === e.target.name) { el.value = e.target.checked; }
      return el;
    });
    setList([...dataList]);
    onSelect([...dataList]);
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
            {isMobile
              ? (
                <Holdable
                  theme={theme}
                  name={element[displayedValue]}
                  onHold={handleChange}
                  onClick={(e) => e.preventDefault()}
                  key={id}
                  forx={element[displayedValue]}
                >
                  <RenderType theme={theme} type={type} element={element} i={i} />
                </Holdable>
              )
              : (
                <>
                  <RenderType theme={theme} type={type} element={element} i={i} />
                  {user.role != "User" &&
                  <>
                  {theme == 'light' ?
                    <CheckboxLightContainer>
                      <Checkbox
                        checkboxType={CHECKBOX_TYPE.GENERIC_ELEMENT}
                        name={element[displayedValue]}
                        checked={element.value}
                        onChange={handleChange}
                      />
                    </CheckboxLightContainer>
                    :
                    <CheckboxContainer>
                      <Checkbox
                        checkboxType={CHECKBOX_TYPE.GENERIC_ELEMENT}
                        name={element[displayedValue]}
                        checked={element.value}
                        onChange={handleChange}
                      />
                    </CheckboxContainer>
                  }
                  </>
                }
                </>
              )}
          </>,
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
