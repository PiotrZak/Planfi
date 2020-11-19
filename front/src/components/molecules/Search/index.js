import React from 'react';
import Input from 'components/molecules/Input';
import PropTypes from 'prop-types';

const Search = ({ callBack, placeholder }) => (
  <Input type="left" icon="search" onChange={callBack} placeholder={placeholder} />
);

Search.propTypes = {
  callback: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

export default Search;
