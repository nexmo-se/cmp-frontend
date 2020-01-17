import React from "react";
import voltaIcons from "@vonagevolta/test/dist/symbol/volta-icons.svg";

import CompanyLogo from "components/SideNavigation/CompanyLogo";
import Greetings from "components/SideNavigation/Greetings";
import SingleMenu from "components/SideNavigation/SingleMenu";
import NestedMenu from "components/SideNavigation/NestedMenu";
import MenuSeparator from "components/SideNavigation/MenuSeparator";

function SideNavigation(props){
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
            <NestedMenu icon="Vlt-icon-rocket" label="Blaster">
              <SingleMenu icon="Vlt-icon-download" label="Download Template"/>
              <SingleMenu icon="Vlt-icon-upload" label="Upload Template"/>
            </NestedMenu>
            <MenuSeparator>Configurations</MenuSeparator>
            <SingleMenu icon="Vlt-icon-key" label="API Key"/>
            <SingleMenu icon="Vlt-icon-keypad" label="Application"/>
            <SingleMenu icon="Vlt-icon-mind-map" label="Channel"/>
            <SingleMenu icon="Vlt-icon-stack" label="Template"/>
            <SingleMenu icon="Vlt-icon-gallery" label="Media"/>
            <SingleMenu icon="Vlt-icon-design-tools" label="Parameter"/>
            <SingleMenu icon="Vlt-icon-packet" label="Campaign"/>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SideNavigation;