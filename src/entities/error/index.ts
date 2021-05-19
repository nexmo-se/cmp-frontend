import NotImplementedError from "./not-implemented";
import NotAuthenticatedError from "./not-authenticated";

class CustomError extends Error {
  name: string;
  code: string;
  message: string;

  constructor(name: string, message: string){
    super();
    this.name = name;
    this.code = name;
    this.message = message;
  }
}

export { NotImplementedError, NotAuthenticatedError };
export default CustomError;