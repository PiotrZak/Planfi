
import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userService } from "../services/userServices";
import { alertActions } from "../redux/actions/alert.actions";

//todo make generic
const UserComponent = ({ user }) => {

  return (
    <div className="user-component">
      <h1>{user.email}</h1>
      <p>{user.role}</p>
      <Arrow />
    </div>
  );
};

const ExerciseComponent = ({ exercise }) => {

  return (
    <div className="user-component">
      <img src={`data:image/jpeg;base64,${exercise.file}`} />
      <div>
        <h3>{exercise.name}</h3>
        <p>{exercise.series} / {exercise.times}</p>
      </div>
      <Link to={{
        pathname: `/exercise/${exercise.exerciseId}`,
        state: { id: exercise.exerciseId }
      }}>
        <button>View</button></Link>
    <Arrow />
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="arrow">
    </div>
  );
}

export default ExerciseComponent;