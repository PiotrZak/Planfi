import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';

const MainTemplate = ({ children, theme }) => (
  <div>
    <GlobalStyle theme = {theme}/>
    {children}
  </div>
);

export default MainTemplate;
