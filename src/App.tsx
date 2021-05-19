import React from "react";
import LuxonUtils from "@date-io/luxon";
import Fetcher from "utils/fetcher";
import { SWRConfig } from "swr";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProvider from "contexts/user";
import ErrorProvider from "contexts/error";
import { CookiesProvider } from "react-cookie";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import SideNavigation from "components/SideNavigation";
import PageContainer from "components/PageContainer";
import SectionContainer from "components/SectionContainer";
import PrivateRoute from "components/PrivateRoute";

import LoginPage from "pages/LoginPage";
import ApplicationPage from "pages/ApplicationPage";
import ChannelPage from "pages/ChannelPage";
import QuickWizardPage from "pages/QuickWizardPage";
import APIKeyPage from "pages/APIKeyPage";

import TemplatePage from "pages/TemplatePage";
import TemplateDetailPage from "pages/TemplateDetailPage";

import CampaignPage from "pages/CampaignPage";
import CampaignDetailPage from "pages/CampaignDetailPage";

function App(){
  return (
    <SWRConfig
      value={{
        fetcher: Fetcher.getInstance()
      }}
    >
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <BrowserRouter>
          <CookiesProvider>
            <UserProvider>
              <ErrorProvider>
                  <PageContainer>
                    <SideNavigation />
                    <SectionContainer>
                      <Switch>
                        <Route path="/" component={LoginPage} exact />
                        <PrivateRoute path="/apikeys" component={APIKeyPage} exact />
                        <PrivateRoute path="/applications" component={ApplicationPage} exact />
                        <PrivateRoute path="/campaigns" component={CampaignPage} exact />
                        <PrivateRoute path="/campaigns/:campaignId" component={CampaignDetailPage} exact />
                        <PrivateRoute path="/channels" component={ChannelPage} exact />
                        <PrivateRoute path="/templates" component={TemplatePage} exact />
                        <PrivateRoute path="/templates/:templateId" component={TemplateDetailPage} />
                        <PrivateRoute path="/quickwizard" component={QuickWizardPage} exact />
                      </Switch>
                    </SectionContainer>
                  </PageContainer>
              </ErrorProvider>
            </UserProvider>
          </CookiesProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </SWRConfig>
  )
}
export default App;