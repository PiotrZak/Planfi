import React from 'react'
import ReactPlayer from 'react-player'
import { movieUrl } from 'services/utils'
import styled from 'styled-components'

const ExerciseImageContainer = styled.img`
  height: 400px;
  width: auto;
  object-fit: cover;
`

const Slide = ({ videoName, index, img }) => {
  const base64String = btoa(
    String.fromCharCode.apply(null, new Uint8Array(img))
  )
  const videoNameWithoutSpace = videoName.replaceAll(' ', '%20')

  return img.length > 100 ? (
    <ExerciseImageContainer
      key={index}
      alt={index}
      src={`data:image/jpeg;base64,${base64String}`}
    />
  ) : (
    <ReactPlayer
      controls={true}
      playsinline
      url={`${movieUrl}/${
        videoNameWithoutSpace + 1 + atob(base64String)
      }?authuser=1`}
    />
  )
}

export default Slide
