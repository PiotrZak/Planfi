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

export const StyledModal = Modal.styled`
  position: fixed;
  top: 0 ;
  position: relative;
  margin: 0 2.4rem;
  padding: 0 1.6rem;
  z-index: 1;
  opacity: 1.0;
  width: 40rem;
  height: 50%;
  color: ${({ theme }) => theme.colorWhite};
  align-items: center;
  justify-content: center;
  align-self: center;
  color: ${({ theme }) => theme.colorGray110};
  background: ${({ theme }) => theme.colorWhite};
`;
