import React from "react";
import PlaceList from "../components/PlaceList";

const Dummy_Places = [
  {
    id: "p1",
    title: "Burj Khalifa",
    description: "Tallest building in the world",
    imageUrl:
      "https://images.khaleejtimes.com/storyimage/KT/20200704/ARTICLE/200709340/AR/0/AR-200709340.jpg&MaxW=780&imageVersion=16by9&NCS_modified=20200704205954",
    address:
      "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    location: {
      lat: "22.7034183",
      lng: "-55.564776",
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Burj Khalifa-2",
    description: "Tallest building in the world",
    imageUrl:
      "https://images.khaleejtimes.com/storyimage/KT/20200704/ARTICLE/200709340/AR/0/AR-200709340.jpg&MaxW=780&imageVersion=16by9&NCS_modified=20200704205954",
    address:
      "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    location: {
      lat: "22.7034183",
      lng: "-55.564776",
    },
    creator: "u2",
  },
];
const UserPlaces = (props) => {
  return <PlaceList items={Dummy_Places} />;
};

export default UserPlaces;
