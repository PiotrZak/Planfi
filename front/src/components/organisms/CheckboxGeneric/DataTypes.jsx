import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import GenericElement from "components/molecules/GenericElement/GenericElement"
import { useHistory } from "react-router-dom";
import { routes } from 'utils/routes';

const possibleTypes = {
    categories: 'categories',
    category: 'category',
}


export const RenderType = ({ type, element, i }) => {

    const history = useHistory();

    const redirectToItem = (itemCase, id) => {
        history.push({
            pathname: `/${itemCase}/${id}`,
            state: { id: id }
        })
    }

    const renderType = () => {
        switch (type) {
            case possibleTypes.categories: {
                return (
                    <span onClick={() => redirectToItem(possibleTypes.category, element.categoryId)}>
                        <GenericElement
                            key={i}
                            headline={element.title}
                            subline={`${element.series} / ${element.times}`}
                            category={element.category} />
                    </span>
                )
            }

            case 'users': {
                return (
                    <GenericElement
                        circle={true}
                        image={element.avatar}
                        key={i}
                        headline={`${element.firstName}  ${element.lastName}`}
                        user={element}
                        subline={element.role} />
                )
            }
            case 'plans': {
                return (
                    <GenericElement
                        key={i}
                        headline={element.title}
                        plan={element} />
                )
            }
            case 'exercises': {
                return (
                    <GenericElement
                        key={i}
                        headline={element.name}
                        image={element.files && element.files[0]}
                        subline={`${element.series} / ${element.times}`}
                        exercise={element} />
                )
            }
        }
    }


    return (
        <>
            {renderType(type, element, i)}
        </>
    );
}