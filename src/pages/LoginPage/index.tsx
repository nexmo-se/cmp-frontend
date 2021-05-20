import useUser from "hooks/user";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import LoginForm from "./components/LoginForm";
import LoginContainer from "./components/LoginContainer";
import FormContainer from "./components/FormContainer";

function LoginPage () {
  const { isAuthenticated } = useUser();
  const { push } = useHistory();

  useEffect(
    () => {
      if (!isAuthenticated) return;
      push("/quickwizard");
    },
    [isAuthenticated, push]
  )


  if (isAuthenticated) return null;
  else {
    return(
      <LoginContainer>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </LoginContainer>
    )
  }
}

export default LoginPage;
