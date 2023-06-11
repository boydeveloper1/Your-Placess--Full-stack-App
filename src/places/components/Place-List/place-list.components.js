import React from "react";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import PlaceItem from "../Place-Item/place-item.components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import "./place-list.styles.css";

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-List center">
        <Card>
          <h2>No places found!!! You can create one below. </h2>
          <Button to="/places/new"> Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map((place) => {
        return <PlaceItem key={place.id} place={place} />;
      })}
    </ul>
  );
};

export default PlaceList;
