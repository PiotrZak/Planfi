import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/atoms/Icon';
import ReactPlayer from 'react-player';
import { StyledModal } from 'components/molecules/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  z-index: 500;
`;

const Image = styled.img`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;
`;

export const TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
};

const AttachmentPreview = ({
  attachmentSrc, complete, setID, remove, type, videoType,
}) => {
  const [attachment, setAttachment] = useState('img/blankImage.png');
  const playingStatus = false;

  if (complete && attachment !== attachmentSrc) {
    setAttachment(attachmentSrc);
  }

  // render image preview
  if (type === TYPE.IMAGE) {
    return (
      <Container id={setID}>
        <Circle onClick={remove} id={`img-prev-${setID}`}>
          <Icon name="union" size=".7rem" onClick={remove} id={`img-prev-${setID}`} cursorType="pointer" />
        </Circle>
        <Image src={attachment} />
      </Container>
    );
  }
  // render video player preview
  return (
    <Container id={setID}>
      <Circle onClick={remove} id={`img-prev-${setID}`}>
        <Icon name="union" size=".8rem" onClick={remove} id={`img-prev-${setID}`} cursorType="pointer" />
      </Circle>
      <ReactPlayer
        url={attachment}
        playing={playingStatus}
        width="4.7rem"
        height="4.7rem"
      />
    </Container>
  );
};

AttachmentPreview.propTypes = {
  attachmentSrc: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([TYPE.VIDEO, TYPE.IMAGE]).isRequired,
  videoType: PropTypes.string,
  // setID: PropTypes.string.isRequired,
};

AttachmentPreview.defaultProps = {
  videoType: 'null',
};

export default AttachmentPreview;
