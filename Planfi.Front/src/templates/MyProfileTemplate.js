import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import breakPointSize from 'utils/rwd'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ theme }) => theme.colorGray90};
  width: calc(100% - 5.2rem);
  margin-left: 5.2rem;
  height: 100%;
  color: ${({ theme }) => theme.colorGray10};

  @media screen and ${breakPointSize.xs} {
    width: 100%;
    margin-left: 0;
  }
`

const MyProfileTemplate = ({ children }) => <Wrapper>{children}</Wrapper>

MyProfileTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MyProfileTemplate
