import React from "react";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import "./place-list.styles.css";
const PlaceList = ({ item }) => {
  if (DataTransferItemList.length === 0) {
    return (
      <div className="place-List center">
        <Card>
          <h2>No places found!!! You can create one below. </h2>
          <button> Share Place</button>
        </Card>
      </div>
    );
  }
};

export default PlaceList;
