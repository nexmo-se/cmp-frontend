import React from "react";

import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import Dropdown from "components/Dropdown";
import AddButton from "components/AddButton";

function AddNewApiKey(){
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
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-col--1of3">
            <PasswordInput label="Signature Secret"/>
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <Dropdown label="Signature Method">
              <option>MD5 HASH signature</option>
              <option>MD5 HMAC signature</option>
              <option>SHA1 HMAC signature</option>
              <option>SHA-256 HMAC signature</option>
              <option>SHA-512 HMAC signature</option>
            </Dropdown>
          </div>
        </div>
        <div className="Vlt-right">
          <AddButton>Add New Key</AddButton>
        </div>
      </div>
    </div>
  );
}
export default AddNewApiKey;