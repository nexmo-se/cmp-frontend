import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProvider from "contexts/user";

import LoginPage from "pages/LoginPage";
import DashboardPage from "pages/DashboardPage";
import APIKeyPage from "pages/APIKeyPage";

function App(){
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/apikeys" component={APIKeyPage} exact />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  )
}
export default App;