import React from "react";
import clsx from "clsx";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import { useLocation } from "react-router-dom";

import useUser from "hooks/user";

import CompanyLogo from "components/SideNavigation/CompanyLogo";
import Greetings from "components/SideNavigation/Greetings";
import SingleMenu from "components/SideNavigation/SingleMenu";
import MenuSeparator from "components/SideNavigation/MenuSeparator";


function SideNavigation(){
  const [ menuActive, setMenuActive ] = React.useState(null);
  const [ render, setRender ] = React.useState(false);
  const mLocation = useLocation();
  const mUser = useUser();

  React.useEffect(() => {
    if(mUser.token) setRender(true);
    else setRender(false);
  }, [ mUser.token ])

  React.useEffect(() => {
    if(mLocation.pathname.includes("/dashboard")) setMenuActive("dashboard");
    else if(mLocation.pathname.includes("/reports")) setMenuActive("reports");
    else if(mLocation.pathname.includes("/quickwizard")) setMenuActive("quickwizard");
    else if(mLocation.pathname.includes("/apikeys")) setMenuActive("apikeys");
    else if(mLocation.pathname.includes("/applications")) setMenuActive("applications");
    else if(mLocation.pathname.includes("/channels")) setMenuActive("channels");
    else if(mLocation.pathname.includes("/templates")) setMenuActive("templates")
    else if(mLocation.pathname.includes("/campaigns")) setMenuActive("campaigns");
  }, [ mLocation ])

  if(!render) return null;
  return (
    <React.Fragment>
      <header className="Vlt-sidenav__mobile Vlt-sidenav__mobile--dark">
        <button id="Vlt-sidenav-mobile-trigger">
          <svg className="Vlt-sidenav__collapse__close">
            <use xlinkHref={`${voltaIcons}#Vlt-icon-menu`}/>
          </svg>
        </button>
      </header>

      <div 
        id="Vlt-sidenav" 
        className={clsx(
          "Vlt-sidenav",
          "Vlt-sidenav--dark",
          "Vlt-sidenav--rounded"
        )}
      >
        <CompanyLogo/>
        <Greetings/>

        <div className="Vlt-sidenav__scroll">
          <ul className="Vlt-sidemenu">
            {/* <SingleMenu icon="Vlt-icon-pie-chart" label="Dashboard" active={menuActive === "dashboard"} to="/dashboard" /> */}
            {/* <SingleMenu icon="Vlt-icon-files" label="Reports" to="/reports" active={menuActive === "reports"} /> */}
            <SingleMenu icon="Vlt-icon-rocket" label="Quick Wizard" to="/quickwizard" active={menuActive === "quickwizard"} />
            <MenuSeparator>Configurations</MenuSeparator>
            <SingleMenu icon="Vlt-icon-key" label="API Key" active={menuActive === "apikeys"} to="/apikeys"/>
            <SingleMenu icon="Vlt-icon-keypad" label="Application" active={menuActive === "applications"} to="/applications" />
            <SingleMenu icon="Vlt-icon-mind-map" label="Channel" active={menuActive === "channels"} to="/channels" />
            <SingleMenu icon="Vlt-icon-stack" label="Template" active={menuActive === "templates"} to="/templates" />
            <SingleMenu icon="Vlt-icon-packet" label="Campaign" active={menuActive === "campaigns"} to="/campaigns" />
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
    template: false,
    quickWizard: false
  }
}

export default SideNavigation;