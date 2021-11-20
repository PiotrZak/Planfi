import React from 'react'
import ReactPlayer from 'react-player'
import { movieUrl, imageUrl } from 'services/utils'
import styled from 'styled-components'
import { acceptedImageFileType } from 'support/magicVariables'
import { bytesArrToBase64 } from 'utils/common.util'

const ExerciseImageContainer = styled.img`
  height: 400px;
  width: auto;
  object-fit: cover;
`

const Slide = ({ videoName, index, img }) => {


  const nameWithoutSpace = videoName.replaceAll(' ', '%20')

  return acceptedImageFileType.includes(atob(bytesArrToBase64(img))) ? (
    <ExerciseImageContainer
      key={index}
      alt={index}
      src={`${imageUrl}/${nameWithoutSpace + 1 + atob(bytesArrToBase64(img))}?authuser=1`}
    />
  ) : (
    <ReactPlayer
      controls={true}
      playsinline={true}
      playing={true}
      muted
      loop={true}
      url={`${movieUrl}/${nameWithoutSpace + 1 + atob(bytesArrToBase64(img))}?authuser=1`}
    />
  )
}

export default Slide
