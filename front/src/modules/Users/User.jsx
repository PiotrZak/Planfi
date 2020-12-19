import React, { useState, useEffect, useContext } from 'react';
import { userService } from "services/userServices";
import Icon from 'components/atoms/Icon';
import BackTopNav from 'components/molecules/BackTopNav';
import classnames from 'classnames';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import { isMobile } from "react-device-detect";

import { AssignUsersToPlans } from "./micromodules/AssignUsersToPlan"
import { AssignUsersToTrainers } from "./micromodules/AssignUsersToTrainers"
import { Navs } from './MyProfile';

var ReactBottomsheet = require('react-bottomsheet');

const assignTrainerToUserNotification = "";
const assignPlanText = "";
const assignToTrainerText = "";
const assignToMe = "";

export const User = (props) => {

    const currentUser = JSON.parse((localStorage.getItem('user')));

    const [bottomSheet, setBottomSheet] = useState(false)
    const [assignTrainer, setAssignTrainer] = useState(false);
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [assignPlan, setAssignPlan] = useState(false);

    useEffect(() => {
        getUserById()
    }, []);

    const { match } = props;
    let id = match.params;

    const getUserById = () => {
        userService
            .getUserById(id.id)
            .then((data) => {
                setUser(data);
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    

    const assignUserToTrainer = () => {
        const data = { trainerIds: [currentUser.userId], userIds: [id.id] };
        userService
            .assignUsersToTrainer(data)
            .then(() => {
            })
            .catch((error) => {
            });
    };

    const openAssignPlansToUsers = () => {
        setAssignPlan(true);
        setBottomSheet(false);
    };


    const openAssignTrainersToUsers = () => {
        setAssignTrainer(true);
        setBottomSheet(false);
    };


    return (
        <div>
            <div className="user-container">
                <div className="container">
                    <div className="user-container__container__title">
                    <BackTopNav />
                        <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"white"} /></div>
                    </div>
                    {user && <UserInfo user={user} />}
                    <Navs user={user} />
                </div>
            </div>

            <ReactBottomsheet
                showBlockLayer={false}
                className="bottomsheet-without-background"
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}
                appendCancelBtn={false}
            >
                {isMobile ?
                    <>
                        <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{assignPlanText}</button>
                        {currentUser && currentUser.role == "Owner"
                            ? <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item">{assignToTrainerText}</div>
                            : <button onClick={() => assignUserToTrainer()} className="bottom-sheet-item">{assignToMe}</button>
                        }
                    </>
                    :
                    <>
                        <div className="bottom-sheet-item__oneline">
                            <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />{assignPlanText}</div>
                            {currentUser && currentUser.role == "Owner"
                                ? <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="user-circle" fill="#C3C3CF" />{assignToTrainerText}</div>
                                : <button onClick={() => assignUserToTrainer()} className="bottom-sheet-item">{assignToMe}</button>
                            }
                        </div>
                    </>
                }
            </ReactBottomsheet>
            {/* <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={[id.id]} />
            <AssignUsersToTrainers organizationId={user.organizationId} assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={[id.id]} /> */}
        </div>
    );
}



export default User;