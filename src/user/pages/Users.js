import React from "react";

import UserList from "../components/UserList";
const Users = () => {
  const USERS = [
    {
      id: "1",
      name: "Bibek",
      image:
        "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/83569715_1432766646901525_7817053521982783488_n.jpg?_nc_cat=105&_nc_sid=d4cf07&_nc_ohc=zPRshzLkYYwAX-fwQYJ&_nc_ht=scontent-dfw5-1.xx&oh=ccf4d0c884ee49c7b89dd2607841cfaf&oe=5F23F9CC",
      places: 3,
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
