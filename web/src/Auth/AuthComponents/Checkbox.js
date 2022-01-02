import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

export const CHECKBOX_TYPE = {
  FORMIK: 'formik',
  GENERIC_ELEMENT: 'generic_element',
}

export const CheckboxContainer = styled.div`
  position: relative;
  input {
    z-index: 0;
    position: absolute;
    top: -6rem;
    left: -5rem;
    &:hover {
      cursor: pointer;
    }
  }
`

export const CheckboxLightContainer = styled.div`
  input {
    margin: -6rem 0 0 1.6rem;
    z-index: 2;
    position: absolute;
    &:hover {
      cursor: pointer;
    }
  }
`

const Checkbox = (props) => {
  if (props.checkboxType === CHECKBOX_TYPE.FORMIK) {
    return <StyledCheckboxFormik {...props} />
  }
  if (props.checkboxType === CHECKBOX_TYPE.GENERIC_ELEMENT) {
    return <StyledCheckboxGenericElement {...props} />
  }
  return false
}

const StyledCheckboxFormik = styled(Field)`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1rem;
`

const StyledCheckboxGenericElement = styled.input.attrs({ type: 'checkbox' })`
  width: 2.4rem;
  height: 2.4rem;
`

export default Checkbox
