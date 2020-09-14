import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../../services/userServices";
import { planService } from "./../../services/planService";
import { alertActions } from "../../redux/actions/alert.actions";
import Return from "./../../common/Return"
import { commonUtil } from "../../utils/common.util"
import { Loader } from "../../common/Loader"
import Icon from "./../../common/Icon"
import { CheckboxGenericComponent } from "../../common/CheckboxGenericComponent"
import { CheckboxList } from "../../common/CheckboxList"
import InviteUserModal from "./InviteUsersModal"
import { userContext } from '../../App';
import { Button } from "../../common/buttons/Button"
import { Search } from "../../common/Search";
import Spacer from "../../common/Spacer"

var ReactBottomsheet = require('react-bottomsheet');

export const Users = () => {

    const { user } = useContext(userContext)
    const [users, setUsers] = useState();
    const [trainers, setTrainers] = useState([]);
    const [plans, setPlans] = useState();
    const [activeUsers, setActiveUsers] = useState([])

    const [searchTerm, setSearchTerm] = useState("");


    const [assignPlan, setAssignPlan] = useState(false)
    const [assignTrainer, setAssignTrainer] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [openInviteUserModal, setOpenInviteUserModal] = useState(false)

    const [bottomSheet, setBottomSheet] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        getAllUsers()
        getAllPlans()
        const trainersUsers = getRole("Trainer")
        setTrainers(trainersUsers)
    }, []);

    const getAllUsers = () => {
        userService
            .allUsers()
            .then((data) => {
                setUsers(data);
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });
    }

    const getAllPlans = () => {
        planService
            .getAllPlans()
            .then((data) => {
                setPlans(data);
                setIsLoading(false)
            })
            .catch(() => {
            });
    }

    const usersText = "Users";
    const trainersText = "Trainers";
    const clients = "Clients";
    const organization = "Organization"
    const returnToSubMenu = "return"
    const assignPlanToUserNotification = "Plan sucesfully assigned to users!";
    const assignTrainerToUserNotification = "Trainer sucesfully assigned to users!"
    const noUsers = "There are no Users";
    const deleteUserText = "Delete user"
    const assignToTrainerText = "Assign to trainer"
    const assignPlanText = "Assign plan"
    const selectFromPlans = "Select from plans"
    const selectFromTrainers = "Select from trainers"

    const getRole = (role) => {
        userService
            .getUserByRole(role)
            .then((data) => {
                setUsers(data);
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });
    }

    const submissionHandleElement = (selectedData) => {

        const selectedUsers = commonUtil.getCheckedData(selectedData, "userId")
        setActiveUsers(selectedUsers)

        if (selectedUsers.length > 0) {
            setBottomSheet(true)
        }
    }

    const deleteUser = () => {

    }


    
    const assignUserToPlan = (selectedData) => {

        // {
        //     "userId": "string",
        //     "planId": [
        //       "string"
        //     ]
        //   }

        const data = { userId: activeUsers, planId: [] }

        userService
            .assignPlanToUser(data)
            .then(() => {
                dispatch(alertActions.success(assignPlanToUserNotification))
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });

    }

    const assignUserToTrainer = (selectedData) => {

        console.log(selectedData)
        // {
        //     "trainerId": "string",
        //     "usersId": [
        //       "string"
        //     ]
        //   }

        const data = { trainerId: "lol", usersId: activeUsers }

        userService
            .assignUsersToTrainer(data)
            .then(() => {
                dispatch(alertActions.success(assignTrainerToUserNotification))
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });

    }


    const closeAssignPlansToUser = () =>{
        setBottomSheet(true)
        setAssignPlan(false)
    }

    const filterPlans = event => {
        setSearchTerm(event.target.value);
    };

    const plansResults = !searchTerm
        ? plans
        : plans.filter(plan =>
            plan.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    return (
        <div>
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>{usersText}</h2>
                <div onClick={() => setOpenInviteUserModal(true)}><Icon name={"plus"} fill={"#5e4ae3"} /></div>
            </div>
            <div className="users">

                <div className="users__filters">
                    <p onClick={() => getRole("Organization")}>{organization}</p>
                    <p onClick={() => getRole("Trainer")}>{trainersText}</p>
                    <p onClick={() => getRole("User")}>{clients}</p>
                </div>

                <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />

                <Loader isLoading={isLoading}>
                    {users ? <CheckboxGenericComponent dataType={"users"} displayedValue={"firstName"} dataList={users} onSelect={submissionHandleElement} /> : <h1>{noUsers}</h1>}
                </Loader>


















            </div>
        </div>

                        <ReactBottomsheet
                    showBlockLayer={false}
                    className="bottomsheet-without-background"
                    visible={bottomSheet}
                    onClose={() => setBottomSheet(false)}
                    appendCancelBtn={false}>

                    <Icon name={"check"} fill={"#2E6D2C"} /><p>
                        {/* {activeUsers.map((user, i) =>
                            <p key = {i}>{user.firstName} {user.lastName}</p>
                        )} */}
                        {activeUsers.length} selected
                    </p>


                    <button onClick={() => deleteUser()} className='bottom-sheet-item'>{deleteUserText}</button>
                    <button onClick={() => setAssignPlan(!assignPlan)} className='bottom-sheet-item'>{assignPlanText}</button>
                    <button onClick={() => setAssignTrainer(!assignTrainer)} className='bottom-sheet-item'>{assignToTrainerText}</button>

                    {assignTrainer &&
                        <div>
                            <h2>{selectFromTrainers}</h2>
                            <CheckboxGenericComponent dataType={"users"} displayedValue={"firstName"} dataList={trainers} onSelect={assignUserToPlan} />
                            <Button className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={"Assign Trainer to Users"}></Button>
                        </div>
                    }
                </ReactBottomsheet>


                <ReactBottomsheet
                    showBlockLayer={false}
                    className="bottomsheet-without-background"
                    visible={assignPlan}
                    onClose={() => assignPlan(false)}
                    appendCancelBtn={false}>

                    <Icon name={"check"} fill={"#2E6D2C"} /><p>
                        {/* {activeUsers.map((user, i) =>t
                            <p key = {i}>{user.firstName} {user.lastName}</p>
                        )} */}
                        {activeUsers.length} selected
                    </p>
                    <p onClick={() => closeAssignPlansToUser()}><Icon name={"arrow-left"} fill={"#5E4AE3"} />{returnToSubMenu}</p>
                    <div>
                        <h2>{selectFromPlans}</h2>
                        <Spacer h={60} />
                        <Search callback ={filterPlans}/>
                        <Spacer h={120} />
                        {plansResults && <CheckboxGenericComponent dataType={"plans"} displayedValue={"title"} dataList={plansResults} onSelect={assignUserToPlan} />}
                        <Button className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={"Assign Plans to Users"}></Button>
                    </div>

                </ReactBottomsheet>

        </div>
    );
};
