import React from "react";
import Icon from "components/atoms/Icon";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { translate } from "utils/Translation";
import StyledReactBottomSheet, {
  PanelContainer,
  PanelItem,
} from "components/organisms/BottomSheet";
import EditCategoryModal from "./EditCategoryModal";

const IconWrapper = styled.div`
  margin-top: 0.4rem;
`;

const CategoriesPanel = ({
  selectedCategoryName,
  deleteCategories,
  openEditModal,
  setOpenEditModal,
  theme,
  bottomSheet,
  setBottomSheet,
  selectedCategories,
}) => {
  const closeModal = () => {
    setOpenEditModal(false);
    setBottomSheet("none");
  };

  const openModal = () => {
    setOpenEditModal(true);
    setBottomSheet("none");
  };

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
          <PanelItem onClick={() => deleteCategories()}>
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
              <PanelItem onClick={() => deleteCategories()}>
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
        selectedCategoryName={selectedCategoryName[0]}
        selectedCategories={selectedCategories[0]}
        theme={theme}
        openEditModal={openEditModal}
        onClose={closeModal}
      />
    </StyledReactBottomSheet>
  );
};

export default CategoriesPanel;
