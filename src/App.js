import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProvider from "contexts/user";
import ErrorProvider from "contexts/error";

import LoginPage from "pages/LoginPage";
import DashboardPage from "pages/DashboardPage";
import APIKeyPage from "pages/APIKeyPage";
import ApplicationPage from "pages/ApplicationPage";
import ChannelPage from "pages/ChannelPage";
import TemplatePage from "pages/TemplatePage";
import CampaignPage from "pages/CampaignPage";

function App(){
  return (
    <UserProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/apikeys" component={APIKeyPage} exact />
            <Route path="/applications" component={ApplicationPage} exact />
            <Route path="/campaigns" component={CampaignPage} exact />
            <Route path="/channels" component={ChannelPage} exact />
            <Route path="/templates" component={TemplatePage} exact />
          </Switch>
        </BrowserRouter>
      </ErrorProvider>
    </UserProvider>
  )
}
export default App;