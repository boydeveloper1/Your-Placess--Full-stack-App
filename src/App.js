import "./App.css";
import React, { Fragment, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import Users from "./user/pages/Users.components";
// import NewPlace from "./places/pages/New-Place/new-place.components";
// import UserPlaces from "./places/pages/User-Places/user-places.components";
// import UpdatePlace from "./places/pages/Update-Place/update-place.components";
// import Auth from "./user/pages/Auth/auth.components";
import MainNavigation from "./shared/components/Navigation/Main-Navigation/main-navigation.componenrts";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIELEMENTS/Loading-Spinner/loading-spinner.components";

// lazy loading
const Users = lazy(() => import("./user/pages/Users.components"));
const NewPlace = React.lazy(() =>
  import("./places/pages/New-Place/new-place.components")
);
const UserPlaces = lazy(() =>
  import("./places/pages/User-Places/user-places.components")
);
const UpdatePlace = lazy(() =>
  import("./places/pages/Update-Place/update-place.components")
);
const Auth = lazy(() => import("./user/pages/Auth/auth.components"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
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
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
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
    </Suspense>
  );
};

export default App;
