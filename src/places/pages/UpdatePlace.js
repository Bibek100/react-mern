import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPlace.css";

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
    description: "Tallest building in the world after burj",
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

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

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
  const identifiedPlace = Dummy_Places.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [(setFormData, identifiedPlace)]);
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    console.log("gg");
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        errorText="Please enetr valid title"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        errorText="Please enter a valid description"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
