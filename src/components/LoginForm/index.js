import React from "react";
import { useHistory } from "react-router-dom";

import Login from "entities/login";
import { UserContext } from "contexts/user";

import BigInput from "components/BigInput";
import PasswordBigInput from "components/PasswordBigInput";

function LoginForm(){
  const [ username, setUsername ] = React.useState("");
  const [ password, setPassword ] = React.useState("");
  const [ isLoggingOn, setIsLoggingOn ] = React.useState(false);
  const { login, token } = React.useContext(UserContext);
  const history = useHistory();

  function handleUsernameChange(username){
    setUsername(username);
  }

  function handlePasswordChange(password){
    setPassword(password);
  }

  async function handleLoginClick(e){
    try{
      e.preventDefault();
      setIsLoggingOn(true);
      const l = new Login(username, password);
      await login(l);
    }catch(err){
      setIsLoggingOn(false);
    }
  }

  React.useEffect(() => {
    if(token) history.replace("/quickwizard");
  }, [ token ])

  return (
    <form className="Vlt-card Vlt-bg-white">
      <div className="Vlt-card__content">
        <h1>Login</h1>
        <BigInput 
          placeholder="Username" 
          label="Username" 
          value={username} 
          onChange={handleUsernameChange}
        />
        <PasswordBigInput 
          placeholder="Password" 
          label="Password"
          value={password} 
          onChange={handlePasswordChange}
        />
        <button 
          type="submit" 
          className="Vlt-btn Vlt-btn--secondary Vlt-btn--app" 
          onClick={handleLoginClick}
          disabled={isLoggingOn}
        >
          {isLoggingOn? (
            <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
          ): null}
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginForm;