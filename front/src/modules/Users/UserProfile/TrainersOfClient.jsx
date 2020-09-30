import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from "services/userServices";
import { useDispatch } from "react-redux";
import { alertActions } from "redux/actions/alert.actions";
import GenericElement from "components/molecules/GenericElement/GenericElement"
import messages from 'lang/eng'

export const TrainersOfClient = ({ id }) => {

    const [trainers, setTrainers] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        userService
            .allTrainersByClient(id)
            .then((data) => {
                setTrainers(data)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }, [id]);

    return (
        <div>
            {trainers.length >= 1  ? trainers.map((element, i) => (
                <div key={i}>
                    <Link to={{
                        pathname: `/user/${element.trainerId}`,
                        state: { id: element.trainerId }
                    }}>
                        <GenericElement circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                    </Link>
                </div>
            ))
            :
            <h2>{messages.plans.notTrainers}</h2>
            }
        </div>
    )
}