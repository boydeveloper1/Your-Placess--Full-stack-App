import React, { Fragment, useState, useContext } from "react";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import Modal from "../../../shared/components/UIELEMENTS/Modal/modal.components";
import Map from "../../../shared/components/UIELEMENTS/Map/map.components";
import { AuthContext } from "../../../shared/context/auth-context";
import "./place-item.styles.css";

const PlaceItem = ({ place }) => {
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

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Deleting!!");
  };

  const { description, id, address, imageUrl, title, location, creator } =
    place;

  return (
    <Fragment>
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
          <div className="place-item__image">
            <img src={imageUrl} alt={title} />
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
            {auth.isLoggedIn && <Button to={`/places/${id}`}>EDIT </Button>}
            {auth.isLoggedIn && (
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
