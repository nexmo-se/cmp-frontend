import React from "react";
import clsx from "clsx";

import useUser from "hooks/user";
import { useHistory } from "react-router-dom";

import CompanyLogo from "./CompanyLogo";
import Greetings from "./Greetings";
import SingleMenu from "./SingleMenu";
import MenuSeparator from "./MenuSeparator";

function SideNavigation(){
  const [ menuActive, setMenuActive ] = React.useState("");
  const [ render, setRender ] = React.useState(false);
  const mLocation = useLocation();
  const mUser = useUser();
  const mHistory = useHistory();

  async function handleSignOut(){
    await mUser.logout();
    mHistory.push("/");
  }

  React.useEffect(() => {
    if(mUser.token) setRender(true);
    else setRender(false);
  }, [ mUser.token ])

  React.useEffect(() => {
    if(mLocation.pathname.includes("/quickwizard")) setMenuActive("quickwizard");
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
          <VoltaIcon icon="Vlt-icon-menu" />
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
            <SingleMenu icon="Vlt-icon-rocket" label="Quick Wizard" to="/quickwizard" active={menuActive === "quickwizard"} />
            <MenuSeparator>Configurations</MenuSeparator>
            <SingleMenu icon="Vlt-icon-key" label="API Key" active={menuActive === "apikeys"} to="/apikeys"/>
            <SingleMenu icon="Vlt-icon-keypad" label="Application" active={menuActive === "applications"} to="/applications" />
            <SingleMenu icon="Vlt-icon-mind-map" label="Channel" active={menuActive === "channels"} to="/channels" />
            <NestedMenu icon="Vlt-icon-stack" label="Template" active={menuActive.includes("templates")}>
              <SingleMenu label="Overview" active={menuActive === "templates/overview"} to="/templates/overview" />
              <SingleMenu label="Add New" active={menuActive.includes("templates/add_new")} to="/templates/add_new" />
            </NestedMenu>
            <SingleMenu icon="Vlt-icon-packet" label="Campaign" active={menuActive === "campaigns"} to="/campaigns" />
          </ul>
        </div>
        <div className="Vlt-sidenav__block Vlt-sidenav__block--link Vlt-sidenav__block--border-top">
          <ul className="Vlt-sidemenu">
            <SingleMenu icon="Vlt-icon-quit" label="Sign Out" onClick={handleSignOut} />
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