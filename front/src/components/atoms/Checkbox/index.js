import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`;

const Checkbox = () => <StyledCheckbox type="checkbox" />;

export default Checkbox;
