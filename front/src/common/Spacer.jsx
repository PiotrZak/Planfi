import React from 'react';

const Spacer = ({ w = 0, h = 0 }) => {
  return (
    <div
      className='spacer'
      style={{
        width: w === 0 ? '100%' : w + 'px',
        height: h === 0 ? '100%' : h + 'px',
      }}
    />
  );
};

export default Spacer;
