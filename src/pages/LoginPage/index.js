import React from "react";

import LoginForm from "components/LoginForm";
import LoginContainer from "pages/LoginPage/LoginContainer";
import FormContainer from "pages/LoginPage/FormContainer";

function LoginPage(props){

  const handleLoginClick = (username, password) => props.onLoginClick(username, password);

  return(
    <LoginContainer>
      <FormContainer>
        <LoginForm onLoginClick={handleLoginClick}/>
      </FormContainer>
    </LoginContainer>
  )
}
export default LoginPage;