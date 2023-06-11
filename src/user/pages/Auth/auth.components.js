import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../shared/components/UIELEMENTS/Card/card-components";
import Input from "../../../shared/components/Form-Elements/Input/input.components";
import Button from "../../../shared/components/Form-Elements/Button/button.components";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hooks.js";
import { AuthContext } from "../../../shared/context/auth-context";
import "./auth.styles.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  // state to control the sign up form and login form field and buttons
  const [isLoginMode, setIsLoginMode] = useState(true);

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
    if (!isLoginMode) {
      setFormData(
        { ...formState.input, name: undefined },
        formState.input.email.isValid && formState.input.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.input,
          name: {
            value: "",
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
  const authSubmitHanlder = (event) => {
    event.preventDefault();
    console.log(formState.input);
    // once the user hit login, then the login state changes to true
    auth.login();
    navigate("/");
  };

  return (
    <Card className="authentication">
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password,at least 5 characters "
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
  );
};

export default Auth;
