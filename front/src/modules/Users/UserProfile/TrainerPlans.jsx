import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { planService } from 'services/planService';
import GenericElement from "components/molecules/GenericElement/GenericElement"

export const TrainerPlans = ({ id }) => {

    const [plans, setPlans] = useState([])

    useEffect(() => {
        planService
            .getCreatorPlans(id)
            .then((data) => {
                setPlans(data)
            })
            .catch((error) => {
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
                <h2>No Plans</h2>
            }
        </div>
    )
}