import React from 'react';
import GlobalTemplate from 'templates/GlobalTemplate';
import Icon from 'components/atoms/Icon';

const TestPage = () => (
  <GlobalTemplate>
    {/*  <GenericElementRefactor Headline="HeadLine" Subline="Subline" /> */}
    <h2>Hello World</h2>
    <Icon name="dumbbell" color="white" size="5rem" />
  </GlobalTemplate>
);

export default TestPage;
