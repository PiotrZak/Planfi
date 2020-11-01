import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from "services/userServices";
import { useDispatch } from "react-redux";
import { alertActions } from "redux/actions/alert.actions";
import GenericElement from "components/molecules/GenericElement/GenericElement"
import messages from 'lang/eng'

export const ClientsOfTrainer = ({ id }) => {

    const [clients, setClients] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        userService
            .allClientsByTrainer(id)
            .then((data) => {
                setClients(data)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }, [id]);

    return (
        <div>
            {clients.length >= 1 ? clients.map((element, i) => (
                <div key={i}>
                    <Link to={{
                        pathname: `/user/${element.userId}`,
                        state: { id: element.userId }
                    }}>
                        <GenericElement circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                    </Link>
                </div>
            ))
                :
                <h2>{messages.plans.notClients}</h2>
            }
        </div>
    )
}