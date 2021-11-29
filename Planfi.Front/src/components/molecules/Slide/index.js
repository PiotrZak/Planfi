import React from 'react'
import ReactPlayer from 'react-player'
import { imageUrl } from 'services/utils'
import styled from 'styled-components'
const ExerciseImageContainer = styled.img`
  height: 400px;
  width: auto;
  object-fit: cover;
`

const Slide = ({ index, img }) => {
  return !imageUrl.includes(img) ? (
    <ExerciseImageContainer key={index} alt={index} src={img} />
  ) : (
    <ReactPlayer
      controls={true}
      playsinline={true}
      playing={true}
      muted
      loop={true}
      url={img}
    />
  )
}

export default Slide
