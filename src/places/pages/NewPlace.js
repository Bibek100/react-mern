import React from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="title"
        validators={[]}
        error="please ener valid title"
      />
    </form>
  );
};

export default NewPlace;
