import CustomError from "entities/error";

class FetchAPI{
  static async processResponse(response){
      if(response.status !== 200){
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }
      return response.json();
  }

  static async otherThanGet(method, url, token, body){
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body
    })
    return FetchAPI.processResponse(response);
  }

  static async get(url, token){
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return FetchAPI.processResponse(response)
  }

  static async post(url, token, body){
    return FetchAPI.otherThanGet("POST", url, token, body);
  }

  static async put(url, token, body){
    return FetchAPI.otherThanGet("PUT", url, token, body);
  }
}
export default FetchAPI;