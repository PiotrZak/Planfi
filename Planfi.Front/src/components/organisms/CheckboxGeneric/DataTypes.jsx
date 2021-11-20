import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericElement from 'components/molecules/GenericElement';
import styled from 'styled-components';
import { translate } from "utils/Translation";
import { ConsoleView } from 'react-device-detect';

export const possibleTypes = {
  categories: 'categories',
  category: 'category',
  exercises: 'exercises',
  exercise: 'exercise',
  plans: 'plans',
  plan: 'plan',
  users: 'users',
  user: 'user',
};

const StyledGenericElement = styled(GenericElement)`
  margin-bottom: .8rem;
`;

export const RenderType = ({
  theme, type, element, i, interaction
}) => {
  const history = useHistory();

  if (interaction == undefined) {
    interaction = true;
  }

  const redirectToItem = (itemCase, id, title) => {
    if (itemCase == possibleTypes.category || itemCase == possibleTypes.plan) {
      history.push({
        pathname: `/${itemCase}/${id}`,
        state: { id: id, title: title },
      });
    }
    else {
      history.push({
        pathname: `/${itemCase}/${id}`,
        state: { id },
      });
    }
  }

  const renderType = () => {
    switch (type) {
      case possibleTypes.categories:

        let exerciseLabel = translate("Exercises");
        if (element.exercises == 1) {
          exerciseLabel = translate("Exercise")
        }
        return (
          <StyledGenericElement
            key={i}
            onClick={() => redirectToItem(possibleTypes.category, element.categoryId, element.title)}
            headline={element.title}
            subline={`${element.exercises}  ${exerciseLabel}`}
            category={element.category}
            AvatarType="noAvatar"
          />
        );

      case 'users':
        return (
          <StyledGenericElement
            key={i}
            onClick={() => interaction && redirectToItem(possibleTypes.user, element.user_Id)}
            version={theme}
            avatarType="circle"
            avatarUrl={element.avatar && element.avatar}
            headline={element.is_Activated
              ? `${element.first_Name}  ${element.last_Name}`
              : `${element.email}`}
            user={element}
            subline={element.is_Activated ? element.role : 'Pending'}
          />
        );
      case 'plans':
        return (
          <StyledGenericElement
            onClick={() => interaction && redirectToItem(possibleTypes.plan, element.planId, element.title)}
            version={theme}
            avatarType="noAvatar"
            key={i}
            headline={element.title}
            subline={element.creatorName}
            plan={element}
          />
        );

      case 'exercises':
        return (
          <StyledGenericElement
            key={i}
            avatarType="circle"
            avatarUrl={element.file}
            onClick={() => redirectToItem(possibleTypes.exercises, element.exerciseId)}
            headline={element.name}
            subline={element.series ? `${element.series.length} serie` : undefined}
            exercise={element}
          />
        );
    }
  };

  return (
    <>
      {renderType(type, element, i)}
    </>
  );
};
