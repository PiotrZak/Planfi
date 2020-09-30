import React from 'react';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';

const SearchBox = styled.div`

`;

const Search = ({ callBack }) => (
  <div className="search-box">
    <input onChange={callBack} className="search-txt" type="text" placeholder="What are you looking for?" />
    <a className="search-btn" href="#">
      <div className="search-box__icon"><Icon name="search" fill="#5E4AE3" width="2.4rem" height="2.4rem" /></div>
    </a>
  </div>
);

export default Search;
