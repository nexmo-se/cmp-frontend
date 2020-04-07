import CustomError from "entities/error";

class FetchAPI{
  static async processResponse(response, responseType="json"){
      if(response.status >= 400 && response.status <= 499){
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }else if(response.status >= 500 && response.status <= 599){
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }else if(response.status !== 200){
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }
      
      try{
        if(responseType === "json") return await response.json();
        else if(responseType === "blob") return await response.blob();
        else await response.text();
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

  static async get(url, token, responseType="json"){
    console.log(`Processing GET ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return FetchAPI.processResponse(response, responseType)
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