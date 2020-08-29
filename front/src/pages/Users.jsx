import React, { useState, useEffect } from "react";
import { FormInput } from "../common/FormInput";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { userService } from "../services/userServices";

import { alertActions } from "../redux/actions/alert.actions";

import UserComponent from "../common/UserComponent";

export const Users = (props) => {
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  const data = [
      {
          "id": 1,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "test",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 2,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "piotrzak77@gmail.com",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 3,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "grvdfb",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 4,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "bhgfdg",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 5,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "vfvfv",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 6,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "svvvtring",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 7,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "vfdfgd",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 8,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "vfdfgdf",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      },
      {
          "id": 9,
          "avatar": null,
          "firstName": null,
          "lastName": null,
          "email": "cdcdc",
          "password": null,
          "passwordHash": null,
          "passwordSalt": null,
          "role": null,
          "token": null
      }
  ]

  useEffect(() => {
    userService
      .allUsers()
      .then((data) => {
        console.log(data);
        setUsers(data);
        dispatch(alertActions.success("User succesfully loaded!"));
      })
      .catch((error) => {
        console.log(error);
        dispatch(alertActions.error(error.title));
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
        <div className ="users">
      {data && data.map((user) => <UserComponent user={user} />)}
      </div>
    </div>
  );
};
