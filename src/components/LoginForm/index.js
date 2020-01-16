import React from "react";

import BigInput from "components/BigInput";
import PasswordBigInput from "components/PasswordBigInput";

function LoginForm(props){
  const [ username, setUsername ] = React.useState("");
  const [ password, setPassword ] = React.useState("");

  const handleUsernameChange = (username) => setUsername(username);
  const handlePasswordChange = (password) => setPassword(password);
  const handleLoginClick = () => props.onLoginClick(username, password);

  return (
    <div className="Vlt-card Vlt-bg-white">
      <div className="Vlt-card__content">
        <h1>Login</h1>
        <BigInput placeholder="frans.siswanto@vonage.com" label="Username" value={username} onChange={handleUsernameChange}/>
        <PasswordBigInput placeholder="Password" label="Password" value={password} onChange={handlePasswordChange}/>
        <button className="Vlt-btn Vlt-btn--primary Vlt-btn--app" onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}
export default LoginForm;