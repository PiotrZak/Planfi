import React, { useState, useEffect } from 'react';
import { categoryService } from "../../../services/categoryService";
import { Link, useHistory } from 'react-router-dom';
import { alertActions } from '../../../redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from "../../../common/Icon"
import Return from "../../../common/Return"
import "react-multi-carousel/lib/styles.css";
var ReactBottomsheet = require('react-bottomsheet');

export const Category = (props) => {

    const [category, setCategory] = useState();
    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        categoryService
            .getCategoryById(id.id)
            .then((data) => {
                setCategory(data);
                console.log(data.categoryId)
            })
            .catch((error) => {
            });
    }, [id.id]);

    const deleteCategory = () => {
        categoryService
            .deleteCategoryById(id.id)
            .then(() => {
                dispatch(alertActions.success("Category succesfully deleted!"))
                history.push('/categories');
            })
            .catch(() => {
            });
    }


    const noExerciseInCategory = "There are no added exercises in this category"

    return (
        <div className="container">
            <div className="container__title">
                <Return />

                {category && <h2>{category.title}</h2>}

                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
                {category &&
                <Link
                    to ={{
                        pathname: "/add-exercise",
                        state: { id: category.categoryId }
                    }}
                >
                    <Icon name={"plus"} fill={"#5E4AE3"} />
                </Link>
                }
            </div>
            {category &&  category.exercises === null ? noExerciseInCategory
                : <p>yes</p>}
            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button onClick={() => deleteCategory()} className='bottom-sheet-item'>Delete</button>
            </ReactBottomsheet>
        </div>
    );
}

export default Category;