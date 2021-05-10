import { camelCase, MaskMan } from "maskman.js";
import { HTTPError } from "models/error";

class Fetcher {
  static async parseBody (response: Response): Promise<Record<string, any> | string> {
    if (response.headers.get("content-type")?.includes("application/json")) {
      const jsonresponse = await response.json()
      return MaskMan.convert(jsonresponse).to(camelCase);
    } else return response.text();
  }

  static buildError (response: Record<string, any> | string, defaultStatus?: number) {
    if (typeof response === "string") {
      const error = new HTTPError(response);
      error.status = defaultStatus;
      error.info = response;
      return error;
    } else {
      const error = new HTTPError(response.message);
      error.status = defaultStatus;
      error.info = response;
      return error;
    }
  }

  static getInstance () {
    const customFetcher = async (url: string, token?: string) => {
      const options = JSON.parse(JSON.stringify({
        method: "GET",
        headers: {
          "Authorization": token && `Bearer ${token}`
        }
      }));

      const response = await fetch(url, options);
      const bodyResponse = await Fetcher.parseBody(response);

      if (response.ok) return bodyResponse;
      else {
        const error = Fetcher.buildError(bodyResponse, response.status);
        throw error;
      }
    }

    return customFetcher;
  }
}

export default Fetcher;