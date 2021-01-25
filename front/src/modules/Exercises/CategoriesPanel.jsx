import React, {useState} from "react";
import Icon from "components/atoms/Icon";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { translate } from "utils/Translation";
import StyledReactBottomSheet, {
  PanelContainer,
  PanelItem,
} from "components/organisms/BottomSheet";
import DeleteConfirmationModal from "./DeteleConfirmationModal";
import EditCategoryModal from "./EditCategoryModal";


const IconWrapper = styled.div`
  margin-top: 0.4rem;
`;

const CategoriesPanel = ({
  refreshData,
  selectedCategoryName,
  deleteCategories,
  openEditModal,
  setOpenEditModal,
  theme,
  bottomSheet,
  setBottomSheet,
  selectedCategories,
}) => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const closeModal = () => {
    setOpenEditModal(false);
    setBottomSheet("none");
  };

  const openModal = () => {
    setOpenEditModal(true);
    setBottomSheet("none");
  };

  const openDeleteModalFunction = () => {
    setOpenDeleteModal(true);
    setBottomSheet("none");
  }

  return (
    <StyledReactBottomSheet
      showBlockLayer={true}
      visible={bottomSheet}
      className={""}
      onClose={() => setBottomSheet(false)}
      appendCancelBtn={false}
    >
      {isMobile ? (
        <>
          <PanelItem onClick={() => openDeleteModalFunction()}>
            {selectedCategories.length == 1 ? (
              <p>{translate("DeleteCategory")}</p>
            ) : (
                <p>{translate("DeleteCategoriesText")}</p>
              )}
          </PanelItem>
          {selectedCategories.length < 2 && (
            <PanelItem onClick={openModal}>
              <p>{translate("EditCategory")}</p>
            </PanelItem>
          )}
        </>
      ) : (
          <>
            <PanelContainer>
              <PanelItem>
                <IconWrapper>
                  <Icon name="check" fill={theme.colorInputActive} />
                </IconWrapper>
                {selectedCategories.length} {translate("selected")}
              </PanelItem>
              <PanelItem onClick={() => openDeleteModalFunction()}>
                {selectedCategories.length == 1
                  ? translate("DeleteCategory")
                  : translate("DeleteCategoriesText")
                }
              </PanelItem>
              {selectedCategories.length < 2 && (
                <PanelItem onClick={openModal}>
                  {translate("EditCategory")}
                </PanelItem>
              )}
            </PanelContainer>
          </>
        )}
      <EditCategoryModal
        refreshData={refreshData}
        selectedCategoryName={selectedCategoryName[0]}
        selectedCategories={selectedCategories[0]}
        theme={theme}
        openEditModal={openEditModal}
        onClose={closeModal}
      />
      <DeleteConfirmationModal
        refreshData={refreshData}
        deleteCategories={deleteCategories}
        theme={theme}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        onClose={closeModal}
      />
    </StyledReactBottomSheet>
  );
};

export default CategoriesPanel;
