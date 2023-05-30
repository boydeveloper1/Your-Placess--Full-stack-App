import React from "react";

import UserItem from "../User-Item/user-item.components";
import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import "./user-list.styles.css";

const UserList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No Users Found!!!</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default UserList;
