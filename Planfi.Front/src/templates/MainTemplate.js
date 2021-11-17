import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';

const MainTemplate = ({ children, theme }) => (
  <>
    <GlobalStyle theme={theme} />
    {children}
  </>
);

export default MainTemplate;
