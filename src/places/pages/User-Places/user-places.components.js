import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PlaceList from "../../components/Place-List/place-list.components";
import ErrorModal from "../../../shared/components/UIELEMENTS/Error-Modal/error-modal.components";
import LoadingSpinner from "../../../shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // This gives the dynamic part of route from App.js
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  // Compare it against the data we have to render exactly places based on the user

  // filtering out the places that was deleted
  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevplaces) =>
      prevplaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
