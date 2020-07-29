import react from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
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

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = Dummy_Places.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return;
    <div className="center">
      <h2>Could not find place</h2>
    </div>;
  }
  return (
    <form>
      <Input
        id="title"
        element="input"
        errorText="Please enetr valid title"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
      />
    </form>
  );
};

export default UpdatePlace;
