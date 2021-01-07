import styled from 'styled-components';
import ReactBottomsheet from 'react-bottomsheet';
import breakPointSize from 'utils/rwd';

export const PanelContainer = styled.div`
  color: ${({ theme }) => theme.colorPrimary};
  display:flex;
  justify-content: center;
  transform: translateY(100%);
`;

export const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.white};
`;

export const BottomNavItem = styled.div`
    display:flex;
    align-items:center;
    margin:3.6rem 0 0 1.6rem;
`

export const BottomItem = styled.div`
    border:1px solid ${({ theme }) => theme.colorDarkBorder};
    padding:1.6rem;
    margin:1.8rem 1.8rem;
    background: ${({ theme }) => theme.colorWhite};
    border-radius:8px;
    &:hover{
      cursor:pointer;
    }
`

export const PanelItem = styled.div`
    color: ${({ theme }) => theme.colorPrimary};
    display:flex;
    padding:0 3.6rem;
    color: ${({ theme }) => theme.colorGray100};
    &:hover {
        cursor: pointer;
    }
    @media only screen and ${breakPointSize.xs} {
        height:7.2rem;
        background: ${({ theme }) => theme.colorWhite};
        color: ${({ theme }) => theme.colorGray100};
        justify-content: center;
        border-bottom:1px ${({ theme }) => theme.colorGray20}  solid;
        align-items: center;
        z-index:1;
  }
`;

export const StyledMobileReactBottomSheet = styled.div`
    position: absolute;
    background: ${({ theme }) => theme.colorWhite};
    display: block;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    border: none;
    font-size: 16px;
`;

export const StyledReactBottomSheetExtended = styled(ReactBottomsheet)`

        height:100%;
        justify-content: center;
        /*border-top-left-radius: 2.4rem;
        border-top-right-radius: 2.4rem;
        border-top-width: 2rem; */
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 0 0 0 0;
        position: fixed;
        bottom: 0;
        overflow-y: scroll;
        width: 100%;
        z-index: 4;
        background: ${({ theme }) => theme.colorWhite};
        display: ${({ visible }) => visible};
        @media only screen and ${breakPointSize.xs} {

        }
`;

const StyledReactBottomSheet = styled(ReactBottomsheet)`
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 0 0 0;
        position: fixed;
        bottom: 0;
        height: 7.2rem;
        width: 100%;
        background: ${({ theme }) => theme.colorWhite};
        z-index: 4;
        display: ${({ visible }) => visible};
        @media only screen and ${breakPointSize.xs} {
            font-weight:600;
            height:auto !important;
            border-top-left-radius: 2.4rem;
            justify-content: center;
            border-top-right-radius: 2.4rem;
            border-top-width: 2rem;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            padding: 0 0 0 0;
            position: fixed;
            bottom: 0;
            height: 37.2rem;
            overflow-y: scroll;
            width: 100%;
            z-index: 4;
            background: ${({ theme }) => theme.colorWhite};
            display: ${({ visible }) => visible};
        }
`;

export default StyledReactBottomSheet;
