import React from "react";
import { Input } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";
import styled from "styled-components";


export const DropdownInput = ({
  id,
  name,
  label,
  hasError,
  required,
  list,
  placeholder,
  displayValue,
  defaultValue,
  optionValue,
  isLoading,
  onChange,
}) => (
  <>
    <DropdownWithSpinner
      className={hasError ? "form-control input-error" : "form-control"}
      id={id}
      name={name}
      list={list}
      placeholder={placeholder}
      displayValue={displayValue}
      optionValue={optionValue}
      isLoading={isLoading}
      defaultValue={defaultValue}
      onChange={onChange}
      hasError={hasError}
    />
  </>
);




const Dropdown = ({
  id,
  name,
  hasError,
  list,
  value,
  display,
  defaultValue,
  placeholder,
  onChange,
}) => {
  function mapValues() {
    let elements = list;
    elements.map((element) => {
      element.value = element[value];
      element.display = element[display];
      return element;
    });
    return elements;
  }
  function getSelectedDefaultValue() {
    let elements = mapValues();
    let value = placeholder ? placeholder : "SELECT";
    elements.map((element) => {
      if (element.value === defaultValue) value = element.value;
      return element;
    });
    return value;
  }
  return (
    <>
      <Input
        invalid={hasError ? true : false}
        type="select"
        id={id}
        name={name}
        onChange={onChange}
        className={hasError ? "form-control input-error" : "form-control"}
      >
        {placeholder &&
          <option value="">{placeholder ? placeholder : "SELECT"}</option>
        }
        {mapValues().map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === getSelectedDefaultValue()}
          >
            {option.display}
          </option>
        ))}
      </Input>
      {/* <ValidationHint hasError={hasError} /> */}
    </>
  );
};

const DropdownWithSpinner = ({
  id,
  list,
  displayValue,
  optionValue,
  defaultValue,
  name,
  placeholder,
  hasError,
  isLoading,
  onChange,
}) => {
  function showEmptyList() {
    return (
      <Dropdown
        id={id}
        name={name}
        placeholder={placeholder}
        hasError={hasError}
        list={[]}
        defaultValue={defaultValue}
      />
    );
  }
  function showLoadedList() {
    return (
      <Dropdown
        id={id}
        name={name}
        hasError={hasError}
        list={list}
        defaultValue={defaultValue}
        display={displayValue}
        value={optionValue}
        onChange={onChange}
      />
    );
  }
  function showSpinner() {
    return (
      <Spinner
        className="spinner-border spinner-border spinner-dropdown text-primary "
        role="status"
      ></Spinner>
    );
  }
  function manageState() {
    if (isLoading) {
      return showSpinner();
    } else if (!list || list.length === 0) {
      return showEmptyList();
    } else {
      return showLoadedList();
    }
  }

  return <>{manageState()}</>;
};
