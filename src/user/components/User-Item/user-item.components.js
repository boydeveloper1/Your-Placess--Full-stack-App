import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIELEMENTS/Avatar/avatar.components";
import Card from "../../../shared/components/UIELEMENTS/Card/card-components";

import "./user-item.styles.css";

const UserItem = ({ user }) => {
  const { name, places, id } = user;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={user.image} alt={user.name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places} {places === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
