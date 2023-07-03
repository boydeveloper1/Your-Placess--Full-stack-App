import React, { useEffect, useState, Fragment } from "react";

import UserList from "../components/User-List/user-list.components";
import ErrorModal from "../../shared/components/UIELEMENTS/Error-Modal/error-modal.components";
import LoadingSpinner from "../../shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
