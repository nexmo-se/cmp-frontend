import useUser from "hooks/user";

import LoginForm from "./components/LoginForm";
import LoginContainer from "./components/LoginContainer";
import FormContainer from "./components/FormContainer";

function LoginPage () {
  const { isAuthenticated } = useUser();

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
