import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";
const Users = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const USERS = [
  //   {
  //     id: "1",
  //     name: "Bibek Dahal",
  //     image:
  //       "data:image/jpeg;base64,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",
  //     places: 3,
  //   },
  // ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;

// useEffect(() => {

//   const sendRequest = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/users");
//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message);
//       }
//       console.log(responseData);
//       console.log(responseData.users);
//       setLoadedUsers(responseData.users);
//       setIsLoading(false);
//     } catch (err) {
//       setIsLoading(false);
//       setError(err.message);
//     }
//   };
//   sendRequest();
// }, []);
