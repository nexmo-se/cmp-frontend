import React from "react";

import LoginForm from "components/LoginForm";
import LoginContainer from "pages/LoginPage/LoginContainer";
import FormContainer from "pages/LoginPage/FormContainer";

function LoginPage(props){
  return(
    <LoginContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </LoginContainer>
  )
}
export default LoginPage;