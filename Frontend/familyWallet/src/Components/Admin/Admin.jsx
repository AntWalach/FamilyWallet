import React from "react";
import layouts from "../../styles/layouts.module.css";
import { useUserContext } from "../../context/userContext";

function Admin() {
  const { allUsers, deleteUser } = useUserContext();

  return (
    <div className={`${layouts.innerLayout}`}>
      <h1>Admin</h1>
      <div className="d-flex">
        <ul>
          {allUsers.map((user, index) => (
            <li key={user.id || index} className={` ${layouts.usersLi}`}>
              <div>
                <button
                  className={`${layouts.buttonSubmit}`}
                  onClick={() => {
                    deleteUser(user._id);
                  }}
                >
                  <i className="fa-regular fa-trash-can mx-2"></i>
                </button>
              </div>
              <img src={user.photo} alt={user.name} />
              <p>{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
