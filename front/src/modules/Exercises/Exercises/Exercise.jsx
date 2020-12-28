import React, { useState, useEffect } from 'react';
import { exerciseService } from "services/exerciseService";
import Icon from 'components/atoms/Icon';
import { useHistory, Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import GlobalTemplate from 'templates/GlobalTemplate';
import SmallButton from 'components/atoms/SmallButton';
import Nav from 'components/atoms/Nav';
import BackTopNav from 'components/molecules/BackTopNav';
import { Headline, Subline } from 'components/typography';
import { translate } from 'utils/Translation';
import styled from 'styled-components';
import StyledReactBottomSheet, { PanelContainer, PanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
const ExerciseDeleted = ""

const Exercise = (props) => {


  const { notificationDispatch } = useNotificationContext();

  const [exercise, setExercise] = useState();
  const [bottomSheet, setBottomSheet] = useState('none')
  const history = useHistory();

  const { match } = props;
  let id = match.params.id;

  useEffect(() => {
    exerciseService
      .getExerciseById(id)
      .then((data) => {
        console.log(data)
        setExercise(data);
      })
      .catch((error) => {
      });
  }, [id]);

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(id)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExerciseDeleted') },
            type: 'positive',
          },
        });
        history.goBack()
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  }

  const Breakpoints = {
    desktop: {
      breakpoint: { max: 5000, min: 768 },
      items: 1,
    },
    laptop: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <>
    <GlobalTemplate>
      <Nav>
        {exercise && <BackTopNav text={exercise.title} />}
        {exercise && <SmallButton onClick={() => setBottomSheet('flex')} iconName="plus" />}
      </Nav>

      {exercise && exercise.files &&
        <>
          <Carousel
            swipeable={true}
            responsive={Breakpoints}
          >
            {exercise.files.map((file, i) =>
              <Slide key={i} img={file} />)}
          </Carousel>
          </>
      }


      {exercise &&
          <>
          <h1>{exercise.name}</h1>
          {exercise.series >0 && <><Headline>{translate('Series')}</Headline> <Subline>{exercise.series}</Subline></>}
          {exercise.times >0&& <><Headline>{translate('ExerciseTime')}</Headline> <Subline>{exercise.times}</Subline></>}
          {exercise.repeats >0 && <><Headline>{translate('Repeat')}</Headline><Subline>{exercise.repeats}</Subline></>}
          {exercise.weight >0 && <><Headline>{translate('Weight')}</Headline><Subline>{exercise.weight}</Subline></>}
          <p>Description:{exercise.description}</p>
        </>
      }
    </GlobalTemplate>
            <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet('none')}
            appendCancelBtn={false}
        >
        <PanelContainer>
        <PanelItem>
      <Link to={{
          pathname: `/edit-exercise/${props.location.state.id}`,
          state: { exercise: exercise }
        }}>{translate('Edit')}</Link>
        </PanelItem>

        <PanelItem onClick={() => deleteExercise()} className='bottom-sheet-item'>
        {translate('Delete')}
        </PanelItem>
        </PanelContainer>
      </StyledReactBottomSheet>
      </>
  );
};

const ExerciseImageContainer = styled.img`
height: 400px;
width: auto;
object-fit: cover;
`;


const Slide = ({ key, img }) => {
  return (
      <ExerciseImageContainer key={key} alt={key} src={`data:image/jpeg;base64,${img}`} />
  );
};

export default Exercise;
