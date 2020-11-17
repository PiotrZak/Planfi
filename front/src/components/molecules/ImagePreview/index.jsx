import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SvgUnion from 'assets/iconComponents/Union';

const Container = styled.div`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;

  background: ${({ theme }) => theme.colorGray70};

  position: relative;
`;

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
  top: -.5rem;
  right: -.5rem;
`;

const Image = styled.img`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;
`;

const ImagePreview = ({
  imageSrc, complete, setID, remove,
}) => {
  const [image, setImage] = useState('img/blankImage.png');

  if (complete && image !== imageSrc) {
    setImage(imageSrc);
  }

  return (
    <Container id={setID}>
      <Circle onClick={(e) => remove(e, 'circle')}>
        <SvgUnion width="1rem" height="1rem" onClick={(e) => remove(e, 'icon')} />
      </Circle>
      <Image src={image} />
    </Container>
  );
};

ImagePreview.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  // setID: PropTypes.string.isRequired,
};

export default ImagePreview;
