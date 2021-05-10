class NotImplementedError extends Error { 
  name: string;
  code: string;
  message: string;
  
  constructor () {
    super();
    this.name = "api/not_implemented";
    this.code = "api/not_implemented";
    this.message = "Not Implemented";
  }
}

export default NotImplementedError;
