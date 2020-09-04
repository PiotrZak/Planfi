import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import { Link } from 'react-router-dom';
import Icon from "../../../src/common/Icon"

const EmployeeButton = ({
    user,
    subline
}) => {
    return (
        <div className="rectangleButton">
            <div className="rectangleButton__wrapper">
                <div className="employee__avatar-empty" />

                <div className="rectangleButton-info">
                    <h3 className="rectangleButton-info__headline">{user.firstName} {user.lastName}</h3>
                    <p className="rectangleButton-info__subline">{subline}</p>
                </div>

            </div>

            <div className="rectangleButton-menu">
                <CircleButton iconName="ellipsis-h" />
            </div>
            {user && <Link to={{
                    pathname: `/user/${user.userId}`,
                    state: { id: user.userId }
                }}>
                    <Icon name={"arrow-right"} fill={"white"} />
                </Link>}
        </div>
    )
}

export default EmployeeButton;