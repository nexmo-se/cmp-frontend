import React from "react";

import CustomError from "entities/error";
import APIKey from "entities/apiKey";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import Dropdown from "components/Dropdown";
import AddButton from "components/AddButton";

function AddNewAPIKey({ onAdded }){
  const [ isAdding, setIsAdding ] = React.useState(false);
  const [ name, setName ] = React.useState("");
  const [ apiKey, setAPIKey ] = React.useState("");
  const [ apiSecret, setAPISecret ] = React.useState("");
  const [ signatureSecret, setSignatureSecret ] = React.useState("");
  const [ signatureMethod, setSignatureMethod ] = React.useState("md5hash");
  const { token } = React.useContext(UserContext);
  const { throwError, clearError } = React.useContext(ErrorContext);

  async function handleAddNewClick(e){
    try{
      e.preventDefault();
      setIsAdding(true);
      const key = new APIKey(null, name, apiKey, apiSecret, signatureSecret, signatureMethod);
      await addKey(key)
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
    }
  }

  async function addKey(key){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(key.toJSON())
    });
    
    if(response.status !== 200){
      throw new CustomError("apikeys/add-new-failed", `Error adding to server: ${response.status}`);
    }

    setName("");
    setAPIKey("");
    setAPISecret("");
    setSignatureSecret("");
    setSignatureMethod("md5hash");
    clearError();
    onAdded();
  }

  return (
    <form className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__content">
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-col--1of3">
            <TextInput label="Name" value={name} setValue={setName} />
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <TextInput label="API Key" value={apiKey} setValue={setAPIKey} />
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <PasswordInput label="API Secret" value={apiSecret} setValue={setAPISecret} />
          </div>
        </div>
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-col--1of3">
            <PasswordInput 
              label="Signature Secret" 
              value={signatureSecret} 
              setValue={setSignatureSecret} 
            />
          </div>
          <div className="Vlt-col Vlt-col--1of3">
            <Dropdown label="Signature Method" value={signatureMethod} setValue={setSignatureMethod}>
              <option value="md5hash">MD5 HASH signature</option>
              <option value="md5">MD5 HMAC signature</option>
              <option value="sha1">SHA1 HMAC signature</option>
              <option value="sha256">SHA-256 HMAC signature</option>
              <option value="sha512">SHA-512 HMAC signature</option>
            </Dropdown>
          </div>
        </div>
        <div className="Vlt-right">
          <AddButton
            onClick={handleAddNewClick} 
            disabled={isAdding}
            isAdding={isAdding}
          >
            Add New Key
          </AddButton>
        </div>
      </div>
    </form>
  );
}
export default AddNewAPIKey;