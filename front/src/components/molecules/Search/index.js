import React from 'react';
import Input from 'components/molecules/Input';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled(Input)`
  width: 100%;
`;

const Search = ({ callBack, placeholder }) => (
  <StyledInput typeInput="left" icon="search" onChange={callBack} placeholder={placeholder} />
);

Search.propTypes = {
  callBack: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Search;
