import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import handleTextType from 'support/TextType';
import SvgQuestionCircle from 'assets/iconComponents/QuestionCircle';
import { useThemeContext } from 'support/context/ThemeContext';

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
  children, text, type, required, questionMark,
}) => {
  const { theme } = useThemeContext();

  return (
    <StyledLabel type={type}>
      <Container type={type}>
        <Paragraph>{text}</Paragraph>
        {required && <Asterisk>*</Asterisk>}
        {questionMark && (
          <InnerContainer>
            <SvgQuestionCircle height="1.2rem" width="1.2rem" fill={theme.colorPrimary} />
          </InnerContainer>
        )}
      </Container>
      {children}
    </StyledLabel>
  );
};

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

export default Label;
