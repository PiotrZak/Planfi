import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph';

const Container = styled.div`
  display: flex;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
`;

const Button = styled.div`
  width: 50%;
  padding: .6rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colorGray70};
  background-color: ${({ theme }) => theme.colorGray70};
  color: ${({ theme }) => theme.colorSecondary};
  cursor: pointer;
  text-align: center;

  ${({ active, theme }) => active && `
    border-bottom: 2px solid ${theme.colorPrimaryDefault};
    color: ${theme.colorWhite};
  `}
`;

const SwitchedButton = ({
  firstButtonText, secondButtonText, firstButtonFunc, secondButtonFunc,
}) => {
  useEffect(() => {
    firstButtonFunc();
  }, []);

  const [activeTabID, setActiveTabID] = useState('switched-button-1');

  const setToActive = (e) => {
    const tabClickedID = e.target.id;

    if (tabClickedID !== activeTabID) {
      setActiveTabID(tabClickedID);
    }
  };

  return (
    <Container>
      <Button onClick={(e) => { setToActive(e); firstButtonFunc(); }} id="switched-button-1" active={activeTabID === 'switched-button-1'}>
        <StyledParagraph type="Label-Button" id="switched-button-1">{firstButtonText}</StyledParagraph>
      </Button>
      <Button onClick={(e) => { setToActive(e); secondButtonFunc(); }} id="switched-button-2" active={activeTabID === 'switched-button-2'}>
        <StyledParagraph type="Label-Button" id="switched-button-2">{secondButtonText}</StyledParagraph>
      </Button>
    </Container>
  );
};

SwitchedButton.propTypes = {
  firstButtonText: PropTypes.string.isRequired,
  secondButtonText: PropTypes.string.isRequired,
  firstButtonFunc: PropTypes.func.isRequired,
  secondButtonFunc: PropTypes.func.isRequired,
};

export default SwitchedButton;
