import React from "react";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import CompanyLogo from "components/SideNavigation/CompanyLogo";
import Greetings from "components/SideNavigation/Greetings";
import SingleMenu from "components/SideNavigation/SingleMenu";
import MenuSeparator from "components/SideNavigation/MenuSeparator";

function SideNavigation(props){
  const { menuActive } = props;

  return (
    <React.Fragment>
      <header className="Vlt-sidenav__mobile Vlt-sidenav__mobile--dark">
        <button id="Vlt-sidenav-mobile-trigger">
          <svg className="Vlt-sidenav__collapse__close">
            <use xlinkHref={`${voltaIcons}#Vlt-icon-menu`}/>
          </svg>
        </button>
      </header>

      <div id="Vlt-sidenav" className="Vlt-sidenav Vlt-sidenav--dark">
        <CompanyLogo/>
        <Greetings/>

        <div className="Vlt-sidenav__scroll">
          <ul className="Vlt-sidemenu">
            <SingleMenu icon="Vlt-icon-pie-chart" label="Dashboard" active={menuActive.dashboard} to="/dashboard" />
            <SingleMenu icon="Vlt-icon-files" label="Reports" to="/reports" />
            <MenuSeparator>Configurations</MenuSeparator>
            <SingleMenu icon="Vlt-icon-key" label="API Key" active={menuActive.apiKey} to="/apikeys"/>
            <SingleMenu icon="Vlt-icon-keypad" label="Application" active={menuActive.application} to="/applications" />
            <SingleMenu icon="Vlt-icon-mind-map" label="Channel" active={menuActive.channel} to="/channels" />
            <SingleMenu icon="Vlt-icon-stack" label="Template" active={menuActive.template} to="/templates" />
            <SingleMenu icon="Vlt-icon-packet" label="Campaign" active={menuActive.campaign} to="/campaigns" />
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

SideNavigation.defaultProps = {
  menuActive: { 
    apiKey: false, 
    application: false, 
    campaign: false, 
    dashboard: false,
    channel: false,
    template: false
  }
}

export default SideNavigation;