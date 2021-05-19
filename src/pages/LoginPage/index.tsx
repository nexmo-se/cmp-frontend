import LoginForm from "./components/LoginForm";
import LoginContainer from "./components/LoginContainer";
import FormContainer from "./components/FormContainer";

function LoginPage () {
  return(
    <LoginContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </LoginContainer>
  )
}

export default LoginPage;
