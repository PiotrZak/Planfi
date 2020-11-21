import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import handleTextType from 'support/TextType';
import Icon from 'components/atoms/Icon';

const StyledLabel = styled.label`
  display: flex;
  ${({ type }) => type === 'top' && 'flex-direction: column;'};

  cursor: pointer;  
`;

const Asterisk = styled.p`
  display: block;
  color: ${({ theme }) => theme.colorErrorDefault};
  font-weight: 700;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  ${({ type }) => type === 'top' && 'margin-bottom: .8rem;'};
`;

const Paragraph = styled.p`
  ${() => handleTextType('Label-Button')};
  margin: 0 .2rem 0 0;
`;

const InnerContainer = styled.div`
  margin-left: .2rem;
`;

const Label = ({
  children, text, theme, type, required, questionMark,
}) => (
  <StyledLabel type={type}>
    <Container type={type}>
      <Paragraph>{text}</Paragraph>
      {required && <Asterisk>*</Asterisk>}
      {questionMark && (
      <InnerContainer>
        <Icon name="question-circle" height="1.2rem" width="1.2rem" fill={theme.colorPrimary} />
      </InnerContainer>
      )}
    </Container>
    {children}
  </StyledLabel>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['top', 'left']),
  text: PropTypes.string.isRequired,
  required: PropTypes.bool,
  questionMark: PropTypes.bool,
};

Label.defaultProps = {
  type: 'top',
  required: false,
  questionMark: false,
};

export default withTheme(Label);
