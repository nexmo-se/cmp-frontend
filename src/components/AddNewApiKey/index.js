import React from "react";
import voltaIcons from "@vonagevolta/test/dist/symbol/volta-icons.svg";

import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";

function AddNewApiKey(props){
  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__content">
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-col--1of3">
            <TextInput label="Name"/>
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <TextInput label="API Key"/>
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <PasswordInput label="API Secret"/>
          </div>
        </div>
        <div className="Vlt-right">
          <button className="Vlt-btn Vlt-btn--primary Vlt-btn--app">
            <svg><use xlinkHref={`${voltaIcons}#Vlt-icon-plus`}/></svg>
            Add New
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddNewApiKey;