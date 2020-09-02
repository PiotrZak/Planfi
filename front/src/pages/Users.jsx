import React, {useState, useEffect} from "react";
import {FormInput} from "../common/FormInput";
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {userService} from "../services/userServices";
import {alertActions} from "../redux/actions/alert.actions";

import MenuButton from "../common/MenuButton/MenuButton";
import EmployeeButton from "../common/EmployeeButton/EmployeeButton";

export const Users = (props) => {
    const [users, setUsers] = useState();
    const dispatch = useDispatch();


  useEffect(() => {
    userService
      .allUsers()
      .then((data) => {
        setUsers(data);
        dispatch(alertActions.success("User succesfully loaded!"));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  }, []);

  return (
    <div className="container">
      <div className="users">
        {users && users.map((user) => <UserComponent user={user} />)}
      </div>
    </div>
  );
    const data = [
        {
            "id": 1,
            "avatar": null,
            "firstName": "Jan",
            "lastName": "Kowalski",
            "email": "Jan.Kowalski@gmail.com",
            "password": "pass321",
        },
        {
            "id": 2,
            "avatar": null,
            "firstName": "Piotr",
            "lastName": "Żak",
            "email": "piotrzak77@gmail.com",
            "password": "pass123",
        },
        {
            "id": 3,
            "avatar": null,
            "firstName": "Ewelina",
            "lastName": "Nowak",
            "email": "Ewelina.Nowak@kontakt.com",
            "password": "pass123",
        },
        {
            "id": 4,
            "avatar": null,
            "firstName": "Katarzyna",
            "lastName": "Brdąkała",
            "email": "Katarzyna@biuro.pl",
            "password": "pass123",
        },
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
        <div className="users-container">
            <div className="users">
                {data && data.map((user) => <EmployeeButton user={user} headline="Tadeusz Olszewski" subline="Trener" avatar/>)}
            </div>
        </div>
    );
};
