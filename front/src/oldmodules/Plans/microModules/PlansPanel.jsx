import React from 'react';
import "react-multi-carousel/lib/styles.css";
import { Loader } from 'components/atoms/Loader';
import GenericElement from "components/molecules/GenericElement/GenericElement"
import { isMobile } from "react-device-detect";
import messages from 'lang/eng'

var ReactBottomsheet = require('react-bottomsheet');

export const PlansPanel = ({ bottomSheet, setBottomSheet, categories, openAssignExercises, isLoading }) => {
    return (
        <ReactBottomsheet
            showBlockLayer={false}
            className={!isMobile && "bottomsheet-without-background"}
            visible={bottomSheet}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}>
            <Loader isLoading={isLoading}>
                {categories ?
                    categories.map((element, i) =>
                        <div onClick={() => openAssignExercises(element.categoryId)}>
                            <GenericElement className="bottom-item" key={i} headline={element.title} subline={`${element.series} / ${element.times}`} category={element.category} />
                        </div>)
                    : <p>{messages.plans.noCategories}</p>
                }
            </Loader>
            }
    </ReactBottomsheet>
    )
}
