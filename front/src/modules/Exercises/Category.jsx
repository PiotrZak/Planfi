import React, { useState, useEffect } from 'react';
import { categoryService } from "services/categoryService";
import { exerciseService } from "services/exerciseService";
import { Link, useHistory } from 'react-router-dom';
import Icon from 'components/atoms/Icon';
import { commonUtil } from "utils/common.util"
import Loader from 'components/atoms/Loader';
import "react-multi-carousel/lib/styles.css";
// import { PlanPanelExercises } from "../Plans/microModules/PlanPanelExercises"
import Search from "components/molecules/Search"
// import Spacer from "components/atoms/Spacer"
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from "../../templates/GlobalTemplate"

var ReactBottomsheet = require('react-bottomsheet');

const noExerciseInPlan = "There are no added exercises in this Plan";

export const Category = (props) => {

    const [category, setCategory] = useState();
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)

    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    useEffect(() => {
        getCategory(id.id)
        getCategoryExercise(id.id)
    }, [id.id]);


    const getCategory = (id) => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
            });
    }

    const getCategoryExercise = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                console.log(data)
                setExercises(data);
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    const deleteCategory = () => {
        categoryService
            .deleteCategoryById(id.id)
            .then(() => {
                history.push('/categories');
            })
            .catch(() => {
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveSelectedExercise(selectedExercises)
        if (selectedExercises.length > 0) {
            setSelectedElementsBottomSheet(true);
        } else {
            setSelectedElementsBottomSheet(false);
        }
    }

    const filterExercises = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? exercises
        : exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );


    const noExerciseInCategory = "There are no added exercises in this category"

    return (
        <div>
            <GlobalTemplate>
                <Nav>
                    <BackTopNav/>
                    {category && <h2>{category.title}</h2>}
                    <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
                    {category &&
                        <Link
                            to={{
                                pathname: "/add-exercise",
                                state: { id: category.categoryId }
                            }}
                        >
                            <Icon name={"plus"} fill={"#5E4AE3"} />
                            {/* 
                    todo! design
                        select from all exercises */}
                            {/* <ul id="mainmenu">
                                <li>
                                    <Icon name={"plus"} fill={"#5E4AE3"} />
                                    <ul>
                                        <li ><NavLink to ="/add-exercise">Add New Exercise</NavLink></li>
                                        <li ><NavLink to ="/add-exercise">Add From Exercises</NavLink></li>
                                    </ul>
                                </li>
                            </ul> */}
                        </Link>
                    }
                </Nav>

                <Search callBack={filterExercises} />
                {/* <Spacer h={90} /> */}
                <CheckboxGenericComponent dataType={"exercises"} dataList={exercises} displayedValue={"name"} onSelect={submissionHandleElement} />
                {/* : <h1>{noExerciseInPlan}</h1> */}
                {/* <Loader isLoading={isLoading}>
                    {results ? }
                </Loader> */}

                <ReactBottomsheet
                    visible={bottomSheet}
                    onClose={() => setBottomSheet(false)}>
                    <button onClick={() => deleteCategory()} className='bottom-sheet-item'>Delete</button>
                </ReactBottomsheet>
            </GlobalTemplate>
            {/* <PlanPanelExercises activeSelectedExercise={activeSelectedExercise} id={id} setSelectedElementsBottomSheet={setSelectedElementsBottomSheet} selectedElementsBottomSheet={selectedElementsBottomSheet} props={props} /> */}
        </div>
    );
}

export default Category;