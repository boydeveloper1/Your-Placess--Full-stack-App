import React, { Fragment, useState, useContext } from "react";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import Modal from "../../../shared/components/UIELEMENTS/Modal/modal.components";
import Map from "../../../shared/components/UIELEMENTS/Map/map.components";
import ErrorModal from "../../../shared/components/UIELEMENTS/Error-Modal/error-modal.components";
import LoadingSpinner from "../../../shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./place-item.styles.css";

const PlaceItem = ({ place, onDelete }) => {
  const { description, id, address, image, title, location, creator } = place;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  // to show modal before deleting
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  //  to unshow modal before deleting
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      onDelete(id);
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={location} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
            />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP!
            </Button>
            {auth.userId === creator && (
              <Button to={`/places/${id}`}>EDIT </Button>
            )}
            {auth.userId === creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
