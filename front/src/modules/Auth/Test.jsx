import React from 'react';
import GlobalTemplate from 'templates/GlobalTemplate';
import GenericElement from 'components/molecules/GenericElement';

const TestPage = () => (
  <GlobalTemplate>
    <GenericElement
      HeadLine="lorem ipsum"
      SubLine="lorem ipsum der sit"
      onMenuClick={() => console.log('menu clicked')}
      onSecondaryMenuClick={() => console.log('Secondary menu clicked')}
    />
  </GlobalTemplate>
);

export default TestPage;
