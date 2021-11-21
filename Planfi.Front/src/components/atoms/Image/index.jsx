import React from 'react'
import styled from 'styled-components'

const ImageContainer = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
`

const Image = (image) => (
  <ImageContainer src={`data:image/jpeg;base64,${image.url}`} />
)

export default Image
