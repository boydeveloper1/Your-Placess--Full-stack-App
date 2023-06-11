import "./App.css";
import React, { useState, useCallback, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Users from "./user/pages/Users.components";
import NewPlace from "./places/pages/New-Place/new-place.components";
import UserPlaces from "./places/pages/User-Places/user-places.components";
import UpdatePlace from "./places/pages/Update-Place/update-place.components";
import Auth from "./user/pages/Auth/auth.components";
import MainNavigation from "./shared/components/Navigation/Main-Navigation/main-navigation.componenrts";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Route index element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        {/* Add error page here for invalid routes  */}
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route index element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/authentication" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/authentication" />} />
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <main>
        <Routes>
          <Route path="/" element={<MainNavigation />}>
            {/* <Route index element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/authentication" element={<Auth />} /> */}
            {routes}
          </Route>
        </Routes>
      </main>
    </AuthContext.Provider>
  );
};

export default App;
