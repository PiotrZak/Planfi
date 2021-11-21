import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'components/atoms/Icon'
import Random from 'utils/Random'
import PropTypes from 'prop-types'

const Container = styled.div`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;

  background: ${({ theme }) => theme.colorGray70};

  position: relative;
`

const Circle = styled.div`
  height: 1.6rem;
  width: 1.6rem;

  //center X icon in Circle
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colorErrorDefault};
  border-radius: 50%;

  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`

const Image = styled.img`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;
`

const ImagePreview = ({ imageSrc, complete }) => {
  const [image, setImage] = useState('img/blankImage.png')
  const ID = Random(1, 10000)

  if (complete && image !== imageSrc) {
    setImage(imageSrc)
  }

  const removeImage = () => {
    document.getElementById(ID).remove()
  }

  return (
    <Container id={ID}>
      <Circle onClick={removeImage}>
        <Icon name="union" width="1rem" height="1rem" />
      </Circle>
      <Image src={image} />
    </Container>
  )
}

ImagePreview.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
}

export default ImagePreview
