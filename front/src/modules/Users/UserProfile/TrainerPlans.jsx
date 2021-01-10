import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { planService } from 'services/planService';
import GenericElement from 'components/molecules/GenericElement';
import styled from 'styled-components';
import { possibleTypes } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';

const StyledGenericElement = styled(GenericElement)`
  margin-bottom: .8rem;
`;

export const TrainerPlans = ({ id }) => {
  const { theme } = useThemeContext();
  const [plans, setPlans] = useState([]);
  const history = useHistory();

  useEffect(() => {
    planService
      .getCreatorPlans(id)
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
      });
  }, [id]);

  const redirectToItem = (itemCase, id) => {
    history.push({
      pathname: `/${itemCase}/${id}`,
      state: { id },
    });
  };

  return (
    <div>
      {plans.length >= 1 ? plans.map((element, i) => (
        <div key={i.toString()}>
          <StyledGenericElement
            onClick={() => redirectToItem(possibleTypes.plan, element.planId)}
            theme={theme}
            avatarType="circle"
            key={i}
            headline={element.title}
            subline={element.creatorName}
            plan={element}
          />
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
