import styled from 'styled-components';

const ReactBottomsheet = require('react-bottomsheet');

export const PanelContainer = styled.div`
  color: ${({ theme }) => theme.colorPrimary};
  display:flex;
`;

export const PanelItem = styled.div`
    color: ${({ theme }) => theme.colorPrimary};
    display:flex;
    padding:0 3.6rem;
`;

const StyledReactBottomSheet = styled(ReactBottomsheet)`
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 0 0 0 0;
        position: fixed;
        bottom: 0;
        height: 7.2rem;
        width: 100%;
        background: ${({ theme }) => theme.colorGray80};
        z-index: 4;
        display: ${({ visible }) => visible};
`;
export default StyledReactBottomSheet;
