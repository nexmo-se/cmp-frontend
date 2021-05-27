class NotAuthenticatedError extends Error {
  name: string;
  code: string;
  message: string;

  constructor () {
    super();
    this.name = "api/not_authenticated";
    this.code = "api/not_authenticated";
    this.message = "Invalid credential. Please re-login";
  }
}

export default NotAuthenticatedError;
