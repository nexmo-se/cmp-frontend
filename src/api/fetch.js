import CustomError from "entities/error";

class FetchAPI{
  static async processResponse(response){
      if(response.status !== 200){
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }
      return response.json();
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body
    })
    return FetchAPI.processResponse(response);
  }
}
export default FetchAPI;