import validator from "validator";
import { FormEvent } from "react";

import useUser from "hooks/user";
import useError from "hooks/error";
import { useState, useEffect } from "react";

import BigInput from "components/BigInput";
import PasswordBigInput from "components/PasswordBigInput";
import LoadingButton from "components/LoadingButton";

function LoginForm () {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { login } = useUser();
  const { throwError } = useError();
  
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isClean) return;

    try {
      setIsSubmitting(true);
      await login({ username, password });
    } catch (err) {
      throwError(err);
      setIsSubmitting(false);
    }
  }

  useEffect(
    () => {
      setIsClean(
        !validator.isEmpty(username) &&
        !validator.isEmpty(password)
      )
    },
    [username, password]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="Vlt-card Vlt-bg-white"
    >
      <div className="Vlt-card__content">
        <h1>Login</h1>
        <BigInput 
          placeholder="Username" 
          label="Username" 
          value={username} 
          onChange={setUsername}
        />
        <PasswordBigInput 
          placeholder="Password" 
          label="Password"
          value={password} 
          onChange={setPassword}
        />
        <LoadingButton
          buttonType="submit"
          disabled={isSubmitting || !isClean}
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </div>
    </form>
  );
}
export default LoginForm;