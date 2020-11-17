import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import handleTextType from 'support/TextType';
import Icon from 'components/atoms/Icon';
import { useThemeContext } from 'support/context/ThemeContext';

// Detect input status
const handleBorderColor = (theme, disabled, error) => {
  if (disabled) {
    return theme.colorGray90;
  }
  if (error) {
    return theme.colorErrorDefault;
  }
  return theme.colorDisabled;
};

// basic input
const StyledInput = styled.input`
  outline: none;
  padding: .6rem 1.6rem;
  border-radius: 3px;

  ${() => handleTextType('body-3-regular')};

  color: ${({ disabled, theme }) => ((disabled) ? theme.colorDisabled : theme.colorPrimary)};
  background: ${({ disabled, theme }) => ((disabled) ? theme.colorGray90 : theme.colorGray80)};
  border: 1px solid ${({ theme, disabled, error }) => handleBorderColor(theme, disabled, error)};

  :focus{
    border: 1px solid ${({ theme }) => theme.colorNeutralDark};
    background: ${({ theme }) => theme.colorGray70};
  }
`;

// icon-left icon-right icon-both
const StyledInputContainer = styled.input`
  outline: none;
  border: none;

  border-radius: ${({ disabled }) => ((disabled) ? 'none' : '3px')};

  ${() => handleTextType('body-3-regular')};

  padding: .6rem 1.6rem;

  color: ${({ disabled, theme }) => ((disabled) ? theme.colorDisabled : theme.colorPrimary)};
  background: ${({ disabled, theme }) => ((disabled) ? theme.colorGray90 : theme.colorGray80)};
`;

const CenterIcon = styled.div`
  padding: .85rem;

  color: ${({ disabled, theme }) => ((disabled) ? theme.colorDisabled : theme.colorPrimary)};
  background: ${({ disabled, theme }) => ((disabled) ? theme.colorGray90 : theme.colorGray80)};
`;

const Container = styled.div`
  display: flex;

  background: ${({ disabled, theme }) => ((disabled) ? theme.colorGray90 : theme.colorGray80)};
  border: 1px solid ${({ theme, disabled, error }) => handleBorderColor(theme, disabled, error)};
  border-radius: 3px;

  ${StyledInputContainer}:focus{
    background: ${({ theme }) => theme.colorGray70};
  }
`;

const ContainerLeft = styled(Container)`
  flex-direction: row-reverse;

  ${StyledInputContainer} + ${CenterIcon}{
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  ${StyledInputContainer}{
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  ${StyledInputContainer}{
    padding: .6rem 1.6rem .6rem 0;
  }
`;

const ContainerRight = styled(Container)`

  ${StyledInputContainer} + ${CenterIcon}{
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }

  ${StyledInputContainer}{
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  ${StyledInputContainer}{
    padding: .6rem 0 .6rem 1.6rem;
  }
`;

const ContainerBoth = styled(Container)`

  ${CenterIcon}:first-child{
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  ${CenterIcon}:last-child{
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }

  ${StyledInputContainer}{
    border-radius: 0;
    padding: 0;
  }
`;

const Input = ({
  typeInput, disabled, error, icon,
}, ...rest) => {
  const { theme } = useThemeContext();

  const TYPE_BORDER = {
    ADD: 'add',
    REMOVE: 'remove',
  };

  const changeBorder = (e, toChange) => {
    // check id of Container
    const ContainerID = 'Container';
    const targetContainer = e.target.parentElement;

    const changeCenterIconBgColor = (element, bgColor) => {
      const centerIcon = element.querySelectorAll('#CenterIcon');
      if (centerIcon) {
        centerIcon.forEach((el) => {
          // eslint-disable-next-line no-param-reassign
          el.style.background = bgColor;
        });
      }
    };

    if (targetContainer.id === ContainerID) {
      if (toChange === TYPE_BORDER.ADD) {
        targetContainer.style.border = `1px solid ${theme.colorNeutralDark}`;
        changeCenterIconBgColor(targetContainer, `${theme.colorGray70}`);
      } else if (toChange === TYPE_BORDER.REMOVE) {
        targetContainer.style.border = `1px solid ${theme.colorInputBorder}`;
        changeCenterIconBgColor(targetContainer, `${theme.colorGray80}`);
      }
    }
  };

  switch (typeInput) {
    case 'basic':
      return <StyledInput {...rest} />;
    case 'left':
      return (
        <ContainerLeft disabled={disabled} error={error} id="Container">
          <StyledInputContainer
            {...rest}
            onFocus={(e) => changeBorder(e, TYPE_BORDER.ADD)}
            onBlur={(e) => changeBorder(e, TYPE_BORDER.REMOVE)}
          />
          <CenterIcon disabled={disabled} id="CenterIcon">
            <Icon name={icon || 'circle'} fill={theme.colorPrimary} />
          </CenterIcon>
        </ContainerLeft>
      );
    case 'right':
      return (
        <ContainerRight disabled={disabled} error={error} id="Container">
          <StyledInputContainer
            {...rest}
            onFocus={(e) => changeBorder(e, TYPE_BORDER.ADD)}
            onBlur={(e) => changeBorder(e, TYPE_BORDER.REMOVE)}
          />
          <CenterIcon disabled={disabled} id="CenterIcon">
            <Icon name={icon || 'circle'} fill={theme.colorPrimary} />
          </CenterIcon>
        </ContainerRight>
      );
    case 'both':
      return (
        <ContainerBoth disabled={disabled} error={error} id="Container">
          <CenterIcon disabled={disabled} id="CenterIcon">
            <Icon name={icon || 'circle'} fill={theme.colorPrimary} />
          </CenterIcon>
          <StyledInputContainer
            {...rest}
            onFocus={(e) => changeBorder(e, TYPE_BORDER.ADD)}
            onBlur={(e) => changeBorder(e, TYPE_BORDER.REMOVE)}
          />
          <CenterIcon disabled={disabled} id="CenterIcon">
            <Icon name={icon || 'circle'} fill={theme.colorPrimary} />
          </CenterIcon>
        </ContainerBoth>
      );
    default:
      return <StyledInput {...rest} />;
  }
};

Input.propTypes = {
  typeInput: PropTypes.oneOf(['basic', 'right', 'left', 'both']),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  icon: PropTypes.string,
};

Input.defaultProps = {
  typeInput: 'basic',
  disabled: false,
  error: false,
  icon: 'circle',
};

export default Input;
