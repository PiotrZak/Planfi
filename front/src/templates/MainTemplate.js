import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';

const MainTemplate = ({ children }) => (
  <div>
    <GlobalStyle />
    {children}
  </div>
);

export default MainTemplate;
