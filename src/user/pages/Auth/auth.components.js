import React, { useState, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import Input from "../../../shared/components/Form-Elements/Input/input.components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import ErrorModal from "../../../shared/components/UIELEMENTS/Error-Modal/error-modal.components";
import LoadingSpinner from "../../../shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";
import ImageUpload from "../../../shared/components/Form-Elements/Image-Upload/image-upload.components";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hooks.js";
// custom hook for server requests
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./auth.styles.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  // state to control the sign up form and login form field and buttons
  const [isLoginMode, setIsLoginMode] = useState(true);

  // states to update UI when fetching data from db and when there is an error interacting with the db
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // switches the login mode to true or false depending on prev state
  const switchModeHandler = () => {
    // switching to login mode
    if (!isLoginMode) {
      setFormData(
        { ...formState.input, name: undefined, image: undefined },
        formState.input.email.isValid && formState.input.password.isValid
      );
      // switching to signup mode
    } else {
      setFormData(
        {
          ...formState.input,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const navigate = useNavigate();

  // to submit the form to db
  const authSubmitHanlder = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.input.email.value,
            password: formState.input.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        // once the user hit this (signup), then the login state changes to true
        auth.login(responseData.userId, responseData.token);
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.input.email.value);
        formData.append("name", formState.input.name.value);
        formData.append("password", formState.input.password.value);
        formData.append("image", formState.input.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        // once the user hit this (signup), then the login state changes to true
        auth.login(responseData.userId, responseData.token);
        navigate("/");
      } catch (error) {}
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHanlder}>
          {/* This input shows up to sign in  */}
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password,at least 8 characters "
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
