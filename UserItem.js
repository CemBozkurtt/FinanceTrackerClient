import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
          </div>
          <div className="user-item__actions">
            <button>Update User</button>
            <button>Delete User</button>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
