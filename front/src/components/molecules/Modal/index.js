import styled from 'styled-components';
import Modal from 'styled-react-modal';

export const SpecialModalBackground = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  &:after{
    content: '';
    background: ${({ theme }) => theme.colorGray30};
    width: 100vw;
    height: 100vh;
    position: absolute;
    opacity: 0.05;
}
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
  right: 2rem;
  margin:0 0 2rem 0;
`;

export const StyledModal = Modal.styled`
  top: 0 ;
  position: relative;
  padding: 0 1.6rem;
  margin:0 1.6rem 0 1.6rem;
  z-index: 1;
  opacity: 1.0;
  width: 40rem;
  height: auto;
  color: ${({ theme }) => theme.colorWhite};
  align-items: center;
  justify-content: center;
  align-self: center;
  color: ${({ theme }) => theme.colorGray110};
  background: ${({ theme }) => theme.colorWhite};
`;
