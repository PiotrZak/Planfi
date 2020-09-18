import React, { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import { Link } from 'react-router-dom';
import GenericElement from "./GenericElement/GenericElement"
import {
  isMobile
} from "react-device-detect";

import { Holdable } from "../../src/hooks/useLongPress";


export const CheckboxGenericComponent = ({
  id,
  className,
  selectAll,
  image,
  dataType,
  dataList, // list of objects
  displayedValue, // value to be displayed on chekbox list
  onSelect,
  initialSelected, // list of IDs - which elements should be selected initially
}) => {
  const [list, setList] = useState();
  // eslint-disable-next-line
  const [initialSelect, setInitialSelect] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setType(dataType);
    if (dataList) setList(dataList);
    if (initialSelected) {
      setInitialSelect(initialSelected);
      selectActive(initialSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    console.log(dataList)
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
        <FormInput
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
                {type === "users" &&
                  <Link to={{
                    pathname: `/user/${element.userId}`,
                    state: { id: element.userId }
                  }}>
                    <GenericElement className={className} circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                  </Link>
                }
                {type === "plans" &&
                  <Link to={{
                    pathname: `/plan/${element.planId}`,
                    state: { id: element.planId }
                  }}>
                    <GenericElement className={className} key={i} headline={element.title} plan={element} />
                  </Link>
                }
                {type === "exercises" &&
                  <GenericElement className={className} key={i} headline={element.name} image={element.files && element.files[0]} subline={`${element.series} / ${element.times}`} exercise={element} />
                }
              </Holdable>

              :
              <>
                {type === "users" &&
                  <Link to={{
                    pathname: `/user/${element.userId}`,
                    state: { id: element.userId }
                  }}>
                    <GenericElement className={className} circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                  </Link>
                }
                {type === "plans" &&
                  <Link to={{
                    pathname: `/plan/${element.planId}`,
                    state: { id: element.planId }
                  }}>
                    <GenericElement className={className} key={i} headline={element.title} plan={element} />
                  </Link>
                }
                {type === "exercises" &&
                  <Link to={{
                    pathname: `/exercise/${element.exerciseId}`,
                    state: { id: element.exerciseId }
                  }}>
                    <GenericElement className={className} key={i} headline={element.name} image={element.files && element.files[0]} subline={`${element.series} / ${element.times}`} exercise={element} />
                  </Link>
                }
              </>
            }
            <input
              className="checkbox-generic-list__checkbox"
              id={`${element[displayedValue]}-checkbox-${id}`}
              key={`${element[displayedValue]}-checkbox-${id}`}
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




