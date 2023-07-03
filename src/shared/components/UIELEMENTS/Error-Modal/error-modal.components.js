import React from "react";

import Modal from "../Modal/modal.components";
import Button from "../../Form-Elements/Button/button.components";

const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
