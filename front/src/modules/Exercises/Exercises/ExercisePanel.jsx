import React from 'react';
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { translate } from 'utils/Translation';
import { isMobile } from "react-device-detect";
import StyledReactBottomSheet, { PanelContainer, PanelItem} from 'components/organisms/BottomSheet'


const ExercisePanel = (
    { props,
      bottomSheet,
      setBottomSheet,
      exercise,
      deleteExercise }
  ) => {
    return(
    <StyledReactBottomSheet
      showBlockLayer={false}
      visible={bottomSheet}
      className={""}
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
      {isMobile ?
        <>
            <PanelItem>
              <Link to={{
                pathname: `/edit-exercise/${props.location.state.id}`,
                state: { exercise: exercise }
              }}>{translate('Edit')}</Link>
            </PanelItem>
        </>
        :
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
        </PanelContainer>}
    </StyledReactBottomSheet>
    )
  }

  export default ExercisePanel;