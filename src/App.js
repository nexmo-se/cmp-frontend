import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProvider from "contexts/user";
import ErrorProvider from "contexts/error";

import SideNavigation from "components/SideNavigation";
import PageContainer from "components/PageContainer";
import SectionContainer from "components/SectionContainer";

import LoginPage from "pages/LoginPage";
import DashboardPage from "pages/DashboardPage";
import APIKeyPage from "pages/APIKeyPage";
import ApplicationPage from "pages/ApplicationPage";
import ChannelPage from "pages/ChannelPage";
import TemplatePage from "pages/TemplatePage";
import CampaignPage from "pages/CampaignPage";
import QuickWizardPage from "pages/QuickWizardPage";
import CampaignDetailPage from "pages/CampaignDetailPage";

function App(){
  return (
    <UserProvider>
      <ErrorProvider>
        <BrowserRouter>
          <PageContainer>
            <SideNavigation />
            <SectionContainer>
              <Switch>
                <Route path="/" component={LoginPage} exact />
                <Route path="/dashboard" component={DashboardPage} exact />
                <Route path="/apikeys" component={APIKeyPage} exact />
                <Route path="/applications" component={ApplicationPage} exact />
                <Route path="/campaigns" component={CampaignPage} exact />
                <Route path="/campaigns/:campaignId" component={CampaignDetailPage} exact />
                <Route path="/channels" component={ChannelPage} exact />
                <Route path="/templates" component={TemplatePage} exact />
                <Route path="/quickwizard" component={QuickWizardPage} exact />
              </Switch>
            </SectionContainer>
          </PageContainer>
        </BrowserRouter>
      </ErrorProvider>
    </UserProvider>
  )
}
export default App;