import styled from 'styled-components'
import handleTextType from './TextType'

const Paragraph = styled.p`
  ${({ type }) => handleTextType(type)}
`

export default Paragraph
