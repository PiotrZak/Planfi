import React, {useState, useEffect} from "react";
import Checkbox from "./MenuButton/checkbox/Checkbox";
import { Icon } from "./Icon";

import React from "react";
import { Link } from 'react-router-dom';
import Icon from "./Icon"
import {useDispatch} from "react-redux";
import {userService} from "../services/userServices";
import {alertActions} from "../redux/actions/alert.actions";

const AVATAR_TYPES = {
    square: "square",
    circle: "circle"
}

const ExerciseComponent = ({ exercise }) => {

  return (
    <div className="user-component">
      <img src={`data:image/jpeg;base64,${exercise.files[0]}`} />
      <div>
        <h3>{exercise.name}</h3>
        <p>{exercise.series} / {exercise.times}</p>
      </div>
      <Link to={{
        pathname: `/exercise/${exercise.exerciseId}`,
        state: { id: exercise.exerciseId }
      }}>
            <Icon name={"arrow-right"} fill={"white"} />
        </Link>
    </div>
  );
};

export default ExerciseComponent;

const UserComponent = (
    {
        user,
        subline,
        checkbox,
        secondaryMenu,
        avatarType
    }

    ) => {

    return (
        <div className="user">
            {checkbox ? (<Checkbox/>) : null}

            {
                user.avatar ?
                    (
                        <img src="" alt="User Avatar" className="user__avatar"/>
                    ) : (
                        <div className="user__avatar-empty"/>
                    )
            }
            <div className="user__info">
                <h3 className="user__info-username">{user.firstName} {user.lastName}</h3>
                <p className="user__info-subline">{subline}</p>
            </div>

            <div className="user__menu">
                <Icon name="ellipsis-h" fill="white" height="2.8rem" width="2.5rem"/>
            </div>

            {
                secondaryMenu ?
                    (
                        <div className="user__menu">
                            <Icon name="draggabledots" fill="white" height="2.5rem" width="3rem"/>
                        </div>
                    ) : null
            }


        </div>
    )
};

export default UserComponent;