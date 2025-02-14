import React from "react";
import { Modal, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

const FullScreenModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 bg-white">
        {/* Blank content */}
      </StyledView>
    </Modal>
  );
};

export default FullScreenModal;