import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Users from "./user/pages/Users.components";
import NewPlace from "./places/pages/NewPlace.components";
import MainNavigation from "./shared/components/Navigation/Main-Navigation/main-navigation.componenrts";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<MainNavigation />}>
          <Route index element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
