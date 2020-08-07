import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewPlace.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

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
//     description: "Tallest building in the world after burj",
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

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // const identifiedPlace = Dummy_Places.find((p) => p.id === placeId);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlaces(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  // useEffect(() => {
  //   if (identifiedPlace) {
  //     setFormData(
  //       {
  //         title: {
  //           value: identifiedPlace.title,
  //           isValid: true,
  //         },
  //         description: {
  //           value: identifiedPlace.description,
  //           isValid: true,
  //         },
  //       },
  //       true
  //     );
  //   }

  //   setIsLoading(false);
  // }, [(setFormData, identifiedPlace)]);
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };
  if (isLoading) {
    console.log("gg");
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onclear={clearError} />
      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            errorText="Please enetr valid title"
            type="text"
            label="title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={loadedPlaces.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            errorText="Please enter a valid description"
            label="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initialValue={loadedPlaces.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
