import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

// const Dummy_Places = [
//   {
//     id: "p1",
//     title: "Burj Khalifa",
//     description: "Tallest building in the world",
//     imageUrl:
//       "https://images.khaleejtimes.com/storyimage/KT/20200704/ARTICLE/200709340/AR/0/AR-200709340.jpg&MaxW=780&imageVersion=16by9&NCS_modified=20200704205954",
//     address:
//       "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
//     location: {
//       lat: "22.7034183",
//       lng: "-55.564776",
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Burj Khalifa-2",
//     description: "Tallest building in the world",
//     imageUrl:
//       "https://images.khaleejtimes.com/storyimage/KT/20200704/ARTICLE/200709340/AR/0/AR-200709340.jpg&MaxW=780&imageVersion=16by9&NCS_modified=20200704205954",
//     address:
//       "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
//     location: {
//       lat: "22.7034183",
//       lng: "-55.564776",
//     },
//     creator: "u2",
//   },
// ];
const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  //const loadedPlaces = Dummy_Places.filter((place) => place.creator == userId);
  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
