import React from 'react'
import Loader from 'components/atoms/Loader'

const ProgressBar = ({ bgcolor, progress, height }) => {
    const Parentdiv = {
      height: height,
      width: '100%',
      backgroundColor: 'whitesmoke',
    }
  
    const Childdiv = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
    }
  
    const Center = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '1.6rem',
    }
  
    return (
      <div style={Parentdiv}>
        <div style={Childdiv}>
          {progress < 90 ? (
            <div style={Center}>Sending to cloud</div>
          ) : (
            <div style={Center}>
              <Loader isLoading={true}></Loader>Processing in cloud
            </div>
          )}
        </div>
      </div>
    )
  }

  export default ProgressBar;