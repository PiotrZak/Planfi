import styled from 'styled-components';
import ReactBottomsheet from 'react-bottomsheet';

export const PanelContainer = styled.div`
color: ${({ theme }) => theme.colorPrimary};
display:flex;

`;

export const PanelItem = styled.div`
    color: ${({ theme }) => theme.colorPrimary};
    display:flex;
    padding:0 3.6rem;
`;

export const MobilePanelItem = styled.div`
    width:100%;
    height:7.2rem;
    color: ${({ theme }) => theme.colorGray80};
    z-index:1;
    
    }
`;

export const StyledMobileReactBottomSheet = styled.div`
    display: block;
    width: 100%;
    background-color: #fff;
    text-align: center;
    padding: 20px 0;
    border: none;
    border-top: 1px solid #ededed;
    font-size: 16px;
        }
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