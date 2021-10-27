import styled from 'styled-components';
import breakPointSize from 'utils/rwd';

const Nav = styled.div`

/* todo - make work on scroll */
  ${({ active }) => active && `
    position:fixed;
    margin: 0 -1.6rem 0 -1.6rem;
    padding: 0 1.6rem 0 1.6rem;s
    background: ${({ theme }) => theme.colorGray80};
    border-bottom:1px solid ${({ theme }) => theme.colorGray60};
  `}

  display: flex;
  width: 100%;
  height:72px;
  align-items: center;
  justify-content: space-between;
  margin: 1.6rem 0;

  @media only screen and ${breakPointSize.xs} {
     margin-left:1.6rem 0;
    }
`;

export default Nav;
