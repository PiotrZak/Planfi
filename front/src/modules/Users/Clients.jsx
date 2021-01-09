import React from 'react';
import GlobalTemplate from 'templates/GlobalTemplate';
import Nav from 'components/atoms/Nav';
import Heading from 'components/atoms/Heading';
import { translate } from 'utils/Translation';
import SmallButton from 'components/atoms/SmallButton';

const Clients = () => (
  <GlobalTemplate>
    <Nav>
      <Heading>{translate('Clients')}</Heading>
      <SmallButton iconName="plus" />
    </Nav>
  </GlobalTemplate>
);

export default Clients;
