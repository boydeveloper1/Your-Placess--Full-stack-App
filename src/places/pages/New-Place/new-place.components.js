import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../shared/components/Form-Elements/Input/input.components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import ErrorModal from "../../../shared/components/UIELEMENTS/Error-Modal/error-modal.components";
import LoadingSpinner from "../../../shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";
import ImageUpload from "../../../shared/components/Form-Elements/Image-Upload/image-upload.components";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "./new-place.styles.css";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { Fragment } from "react";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.input.title.value);
      formData.append("description", formState.input.description.value);
      formData.append("address", formState.input.address.value);
      formData.append("image", formState.input.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/" + auth.userId + "/places");
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={InputHandler}
        />
        <Input
          id="description"
          placeholder=""
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters) "
          onInput={InputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid address. "
          onInput={InputHandler}
        />
        <ImageUpload
          id="image"
          onInput={InputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
