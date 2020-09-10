import React from "react";
import Checkbox from "./checkbox/Checkbox";
import CircleButton from "../CircleButton/CircleButton";
import { Link } from 'react-router-dom';
import Icon from "../../../src/common/Icon"
import { planService } from "../../services/planService";

const GenericElement = ({
    handleElement,
    id,
    headline,
    subline,
    image,
    checkbox,
    secondaryMenu,
    exercise,
    category,
    plan,
}) => {

    return (
        <div className="rectangleButton">
            <div className="rectangleButton__wrapper">
                {checkbox && <Checkbox handleElement ={handleElement} id ={id}/>}
                {image && <div className="menuButton__image"><img src={`data:image/jpeg;base64,${image}`} /></div>}

                <div className="rectangleButton-info">
                    <h3 className="rectangleButton-info__headline">{headline}</h3>
                    <p className="rectangleButton-info__subline">{subline}</p>
                </div>

            </div>
            <div className="rectangleButton__menu">
                <CircleButton iconName="ellipsis-h" />

                {secondaryMenu && <CircleButton iconName="draggabledots" />}

                {exercise && <Link to={{
                    pathname: `/exercise/${exercise.exerciseId}`,
                    state: { id: exercise.exerciseId }
                }}>
                    <Icon name={"arrow-right"} fill={"white"} />
                </Link>}

                {category && <Link to={{
                    pathname: `/category/${category.categoryId}`,
                    state: { id: category.categoryId }
                }}>
                    <Icon name={"arrow-right"} fill={"white"} />
                </Link>}

                {plan && <Link to={{
                    pathname: `/plan/${plan.planId}`,
                    state: { id: plan.planId }
                }}>
                    <Icon name={"arrow-right"} fill={"white"} />
                </Link>}

            </div>
        </div>
    )
}

export default GenericElement;