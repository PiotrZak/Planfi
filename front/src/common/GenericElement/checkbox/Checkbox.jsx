import React, { useState, useEffect } from "react";
import { FormInput } from "../../../common/FormInput"


const Checkbox = ({ handleElement, id }) => {

    const [select, setSelect] = useState(false);
    const [transformedId, setTransformedId] = useState([])

    useEffect(() => {
    }, [handleElement]);

    const handleChange = () => {
        select ? setTransformedId({ id: id, selected: true }) : setTransformedId({ id: id, selected: false })
        setSelect(!select)
        handleElement(transformedId)
    }

    return (
        <FormInput
            type="checkbox"
            checked={select ? true : false}
            onChange={handleChange}
        ></FormInput>
    )
}

export default Checkbox;