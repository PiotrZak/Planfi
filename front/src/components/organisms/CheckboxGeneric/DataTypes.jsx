import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericElement from 'components/molecules/GenericElement';
import styled from 'styled-components';

const possibleTypes = {
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
  theme, type, element, i,
}) => {
  const history = useHistory();
  const redirectToItem = (itemCase, id) => {
    history.push({
      pathname: `/${itemCase}/${id}`,
      state: { id },
    });
  };

  const renderType = () => {
    switch (type) {
      case possibleTypes.categories:
        return (
          <StyledGenericElement
            key={i}
            onClick={() => redirectToItem(possibleTypes.category, element.categoryId)}
            HeadLine={element.title}
            SubLine="TO DO - Get number of exercise in category"
            category={element.category}
            AvatarType="noAvatar"
          />
        );

      case 'users':
        return (
          <StyledGenericElement
            key={i}
            onClick={() => redirectToItem(possibleTypes.user, element.userId)}
            theme={theme}
            AvatarType="circle"
            image={element.avatar}
            HeadLine={`${element.firstName}  ${element.lastName}`}
            user={element}
            SubLine={element.role}
          />
        );
      case 'plans':
        return (
          <StyledGenericElement
            onClick={() => redirectToItem(possibleTypes.plan, element.planId)}
            theme={theme}
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
            onClick={() => redirectToItem(possibleTypes.exercises, element.exerciseId)}
            HeadLine={element.name}
            image={element.files && element.files[0]}
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
