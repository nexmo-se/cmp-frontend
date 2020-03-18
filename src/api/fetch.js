import CustomError from "entities/error";

class FetchAPI{
  static async processResponse(response){
      if(response.status !== 200){
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }
      
      try{
        const jsonResponse = await response.json();
        return jsonResponse
      }catch(err){
        return null;
      }
  }

  static async otherThanGet(method, url, token, body, contentType){
    console.log(`Processing ${method.toUpperCase()} ${url}`);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType      
    }
    Object.keys(headers).forEach(key => headers[key] === undefined && delete headers[key]);

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers,
      body
    })
    return FetchAPI.processResponse(response);
  }

  static async get(url, token){
    console.log(`Processing GET ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return FetchAPI.processResponse(response)
  }

  static async post(url, token, body){
    return FetchAPI.otherThanGet("POST", url, token, body, "application/json");
  }

  static async postFile(url, token, formData){
    return FetchAPI.otherThanGet("POST", url, token, formData, undefined);
  }

  static async put(url, token, body){
    return FetchAPI.otherThanGet("PUT", url, token, body, "application/json");
  }

  static async remove(url, token){
    return FetchAPI.otherThanGet("DELETE", url, token);
  }
}
export default FetchAPI;