import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import GenericElement from 'components/molecules/GenericElement';
import styled from 'styled-components';
import { planService } from 'services/planService';
import { userService } from 'services/userServices';
import { possibleTypes } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';

const StyledGenericElement = styled(GenericElement)`
  margin-bottom: .8rem;
`;

const DisplayData = ({ dataType, id, errorComponent }) => {
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (dataType === 'ClientTrainers') {
      userService
        .allTrainersByClient(id)
        .then((data) => {
          setDataToDisplay(data);
        })
        .catch((error) => {
        });
    } else if (dataType === 'TrainerPlans') {
      planService
        .getCreatorPlans(id)
        .then((data) => {
          setDataToDisplay(data);
        })
        .catch((error) => {
        });
    } else if (dataType === 'UserPlans') {
      planService
        .userPlans(id)
        .then((data) => {
          setDataToDisplay(data);
        })
        .catch((error) => {
        });
    } else if (dataType === 'TrainerClients') {
      userService
        .allClientsByTrainer(id)
        .then((data) => {
          setDataToDisplay(data);
        })
        .catch((error) => {
        });
    }
  }, [id]);

  const toRender = () => {
    if (dataToDisplay >= 1) {
      dataToDisplay.map((element, i) => (
        <StyledGenericElement
          theme={theme}
          avatarType="circle"
          key={i.toString()}
          headline={element.title}
          subline={element.creatorName}
        />
      ));
    } else {
      return (
        <>
          {errorComponent()}
        </>
      );
    }
  };

  return (
    <>
      {toRender()}
    </>
  );
};

DisplayData.propTypes = {
  dataType: PropTypes.oneOf(['ClientTrainers', 'TrainerPlans', 'UserPlans', 'TrainerClients']).isRequired,
  id: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  errorComponent: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default DisplayData;
