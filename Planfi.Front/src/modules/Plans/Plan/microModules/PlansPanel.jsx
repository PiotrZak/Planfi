import React, { useState, useCallback, useEffect } from "react";
import Icon from "components/atoms/Icon";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import Loader from "components/atoms/Loader";
import {
  StyledReactBottomSheetExtended,
  BottomItem,
} from "components/organisms/BottomSheet";
import { Headline, Subline } from "../../../../components/typography";
import { translate } from "utils/Translation";
import Search from "components/molecules/Search";
import { ExerciseDetailsPanel } from "../../../../modules/Plans/Plan/microModules/ExerciseDetailsPanel";
import { Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { getUniqueListBy } from 'utils/common.util'

const BottomNav = styled.div`
  display: flex;
  background: ${({ theme }) => theme.white};
`;

const BottomNavItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3.6rem 0 0 3.6rem;
`;

const SearchContainer = styled.div`
  margin: 1.8rem 1.8rem;
`;

export const PlansPanel = ({
  planId,
  setAssignExercises,
  allExercises,
  bottomSheet,
  setBottomSheet,
  refreshData,
}) => {
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [openExerciseDetailsPlan, setOpenExerciseDetailsPlan] =
    useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState([])

  const openExerciseDetailsPanel = (exercise) => {
    setSelectedExercise(exercise);
    setAssignExercises("none");
    setOpenExerciseDetailsPlan("flex");
  };

  const filterExercises = (event) => {
    setSearchTerm(event.target.value);
  };

  const BASEEXERCISE = gql`{
    allBaseExercises
    {
        exerciseId
        categoryName
        name
        files
     }
    }
  `;

  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(BASEEXERCISE);
  const refreshExerciseData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  useEffect(() => {
    refreshExerciseData();
  }, []);

  const filterByCategoryName = (categoryName) => {
    const isMatch = filters.includes(categoryName);
    let updatedFilters;
    isMatch
      ? updatedFilters = filters.filter((item) => item != categoryName)
      : updatedFilters = filters.concat([categoryName])

    setFilters(updatedFilters)
    setFilteredData(data.allBaseExercises.filter((exercise) => updatedFilters.includes(exercise.categoryName)))
  }

  let baseExercises;
  if (data) {
    if (filteredData.length > 0) {
      baseExercises = !searchTerm
        ? filteredData
        : filteredData.filter((exercise) => exercise.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()));
    }
    else {
      baseExercises = !searchTerm
        ? data.allBaseExercises
        : data.allBaseExercises.filter((exercise) => exercise.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()));
    }
  }

  return (
    <>
      <StyledReactBottomSheetExtended
        showBlockLayer={false}
        className={""}
        visible={bottomSheet}
        onClose={() => setBottomSheet("none")}
        appendCancelBtn={false}
      >
        <Loader isLoading={loading}>
          <BottomNav>
            <BottomNavItem onClick={() => setBottomSheet("none")}>
              <Icon name="arrow-left" fill="#5E4AE3" />
              <Headline>{translate("SelectCategory")}</Headline>
            </BottomNavItem>
          </BottomNav>
          {baseExercises && baseExercises.length >= 1 ? (
            <>
              <SearchContainer>
                <Search
                  typeInput="light"
                  callBack={filterExercises}
                  placeholder={translate("ExerciseSearch")}
                />
              </SearchContainer>
              {getUniqueListBy(data.allBaseExercises, "categoryName")
                .map(x => <p className={filters.includes(x.categoryName) ? "bold" : ""} onClick={() => filterByCategoryName(x.categoryName)}>{x.categoryName}</p>)}
              {baseExercises.map((element, i) => (
                <BottomItem
                  key={i}
                  onClick={() => openExerciseDetailsPanel(element)}
                >
                  <Headline>{element.name}</Headline>
                  <Subline>{element.categoryName}</Subline>
                </BottomItem>
              ))}
            </>
          ) : (
            <>
              {translate("NotExercises")}
              <Link to={{ pathname: `/categories` }}>
                {" "}
                {translate("AddCategory")}
              </Link>
            </>
          )}
        </Loader>
      </StyledReactBottomSheetExtended>
      <ExerciseDetailsPanel
        refreshData={refreshData}
        setBottomSheet={setBottomSheet}
        planId={planId}
        setOpenExerciseDetailsPlan={setOpenExerciseDetailsPlan}
        openExerciseDetailsPlan={openExerciseDetailsPlan}
        exercise={selectedExercise}
        setAssignExercises={setAssignExercises}
      />
    </>
  );
};
