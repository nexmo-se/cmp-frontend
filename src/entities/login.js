import CustomError from "entities/error";

class Login{

  constructor(username, password){
    if(!username) throw new CustomError("login/invalid-username", "Invalid username is given");
    if(!password) throw new CustomError("login/invalid-password", "Invalid password is given");
    
    this.username = username;
    this.password = password;
  }

  toJSON(){
    return {
      username: this.username,
      password: this.password
    }
  }
}
export default Login;