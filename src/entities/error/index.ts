import NotImplementedError from "./not-implemented";

class CustomError extends Error {
  name: string;
  code: string;
  message: string;

  constructor(name, message){
    super();
    this.name = name;
    this.code = name;
    this.message = message;
  }
}

export { NotImplementedError };
export default CustomError;