import React from 'react';
import Input from 'components/molecules/Input';
import PropTypes from 'prop-types';

const Search = ({ callback, placeholder }) => (
  <Input type="left" icon="search" onChange={callback} placeholder={placeholder} />
);

Search.propTypes = {
  callback: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

export default Search;
