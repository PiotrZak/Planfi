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

  function bytesArrToBase64(arr) {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // base64 alphabet
    const bin = n => n.toString(2).padStart(8,0); // convert num to 8-bit binary string
    const l = arr.length
    let result = '';
  
    for(let i=0; i<=(l-1)/3; i++) {
      let c1 = i*3+1>=l; // case when "=" is on end
      let c2 = i*3+2>=l; // case when "=" is on end
      let chunk = bin(arr[3*i]) + bin(c1? 0:arr[3*i+1]) + bin(c2? 0:arr[3*i+2]);
      let r = chunk.match(/.{1,6}/g).map((x,j)=> j==3&&c2 ? '=' :(j==2&&c1 ? '=':abc[+('0b'+x)]));  
      result += r.join('');
    }
  
    return result;
  }


  const base64String = bytesArrToBase64(img);
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
      playsinline={true}
      playing={true}
      muted
      loop={true}
      url={`${movieUrl}/${
        videoNameWithoutSpace + 1 + atob(base64String)
      }?authuser=1`}
    />
  )
}

export default Slide
