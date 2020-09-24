import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { planService } from 'services/planService';
import { useDispatch } from "react-redux";
import { alertActions } from "redux/actions/alert.actions";
import GenericElement from "common/GenericElement/GenericElement"

//todo - care about lang
import messages from 'lang/eng'

export const PlansOfUser = ({ id }) => {

    const [plans, setPlans] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        planService
            .userPlans(id)
            .then((data) => {
                setPlans(data)
                console.log(data)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }, [id]);

    return (
        <div>
            {plans.length >= 1 ? plans.map((element, i) => (
                <div key={i}>
                    <Link to={{
                        pathname: `/plan/${element.planId}`,
                        state: { id: element.planId }
                    }}>
                        <GenericElement key={i} headline={element.title} subline={element.creatorName} plan={element} />
                    </Link>
                </div>
            ))
                :
                <h2>{messages.plans.notPlans}</h2>
            }
        </div>
    )
}