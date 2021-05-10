import CustomError from "entities/error";
import NotAuthenticatedError from "entities/error/notAuthenticated";

class FetchAPI{
  static async processResponse (response: Record<string, any>, responseType: string ="json") {
      if (response.status === 401) {
        throw new NotAuthenticatedError();
      } else if (response.status >= 400 && response.status <= 499) {
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      } else if (response.status >= 500 && response.status <= 599) {
        const errorResponse = await response.json();
        console.log(errorResponse);
        
        const notAuthenticated = ["invalid signature", "jwt malformed"];
        if (notAuthenticated.includes(errorResponse.message)) throw new NotAuthenticatedError();
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      } else if (response.status !== 200) {
        throw new CustomError("fetch/api-error", `Error with response: ${response.status}`)
      }
      
      try {
        if (responseType === "json") return await response.json();
        else if (responseType === "blob") return await response.blob();
        else await response.text();
      } catch(err) {
        return null;
      }
  }

  static async otherThanGet (method: string, url: string, token: string, body: string, contentType: string) {
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

  static async get (url: string, token: string, responseType: string = "json") {
    console.log(`Processing GET ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return FetchAPI.processResponse(response, responseType)
  }

  static async post (url: string, token: string, body: string) {
    return FetchAPI.otherThanGet("POST", url, token, body, "application/json");
  }

  static async postFile (url: string, token: string, formData: string) {
    return FetchAPI.otherThanGet("POST", url, token, formData, undefined);
  }

  static async put (url: string, token: string, body: string) {
    return FetchAPI.otherThanGet("PUT", url, token, body, "application/json");
  }

  static async remove (url: string, token: string) {
    return FetchAPI.otherThanGet("DELETE", url, token);
  }
}
export default FetchAPI;