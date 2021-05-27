import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import validator from "validator";
import clsx from "clsx";

import useUser from "hooks/user";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import CompanyLogo from "./components/CompanyLogo";
import Greetings from "./components/Greetings";
import SingleMenu from "./components/SingleMenu";
import MenuSeparator from "./components/MenuSeparator";

function SideNavigation () {
  const [menuActive, setMenuActive] = useState<string>();
  const [render, setRender] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { logout, token } = useUser();
  const { push } = useHistory();

  async function handleSignOut () {
    logout();
    push("/");
  }

  useEffect(
    () => {
      setRender(
        !validator.isEmpty(token ?? "") &&
        token !== undefined
      )
    },
    [token]
  )

  useEffect(
    () => {
      if (pathname.includes("/quickwizard")) setMenuActive("quickwizard");
      else if (pathname.includes("/apikeys")) setMenuActive("apikeys");
      else if (pathname.includes("/applications")) setMenuActive("applications");
      else if (pathname.includes("/channels")) setMenuActive("channels");
      else if (pathname.includes("/templates")) setMenuActive("templates")
      else if (pathname.includes("/campaigns")) setMenuActive("campaigns");
    },
    [pathname]
  )

  if (!render) return null;
  else {
    return (
      <>
        <header className="Vlt-sidenav__mobile Vlt-sidenav__mobile--dark">
          <button id="Vlt-sidenav-mobile-trigger">
            <svg className="Vlt-sidenav__collapse__close">
              <use xlinkHref={`${voltaIcons}#Vlt-icon-menu`}/>
            </svg>
          </button>
        </header>

        <div 
          id="Vlt-sidenav" 
          className={
            clsx(
              "Vlt-sidenav",
              "Vlt-sidenav--dark",
              "Vlt-sidenav--rounded"
            )
          }
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
              <SingleMenu icon="Vlt-icon-stack" label="Template" active={menuActive === "templates"} to="/templates" />
              <SingleMenu icon="Vlt-icon-packet" label="Campaign" active={menuActive === "campaigns"} to="/campaigns" />
            </ul>
          </div>
          <div className="Vlt-sidenav__block Vlt-sidenav__block--link Vlt-sidenav__block--border-top">
            <ul className="Vlt-sidemenu">
              <SingleMenu icon="Vlt-icon-quit" label="Sign Out" onClick={handleSignOut} />
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default SideNavigation;