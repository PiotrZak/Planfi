import React, { useState, useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { Holdable } from 'hooks/useLongPress';

import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import  Checkbox, { CHECKBOX_TYPE, CheckboxContainer, CheckboxLightContainer } from 'components/atoms/Checkbox';
import { useUserContext } from 'support/context/UserContext';

export const CheckboxGenericComponent = ({
  theme,
  dataType,
  dataList,
  displayedValue,
  onSelect,
}) => {
  const [type, setType] = useState();
  const { user } = useUserContext();
  useEffect(() => {
    dataList.map((el) => {
      { el.value = false; el.isActive = false }
      return el;
    });
    setType(dataType);
  }, [dataList]);

  function handleChange(e) {
    dataList.map((el) => {
      if (isMobile) {
        if (el[displayedValue] === e.currentTarget.getAttribute('name')) {
          el.value = !el.value;
          el.isActive = !el.isActive;
        }
      } else if (el[displayedValue] === e.target.name) { 
        el.value = e.target.checked;
      }
      return el;
    });
    onSelect([...dataList]);
  }

return useMemo(() => (
  <>
    {dataList.map((element, i) => (
      isMobile
        ? (
          <Holdable
            key = {i}
            isActive = {element.isActive}
            theme={theme}
            name={element[displayedValue]}
            onHold={handleChange}
            onClick={(e) => e.preventDefault()}
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
        )
      ))}
  </>
  ))
}
