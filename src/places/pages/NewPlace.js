import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import "./NewPlace.css";
const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please ener valid title"
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please ener valid descrption"
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
