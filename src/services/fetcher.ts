import { enqueueSnackbar } from "notistack";
class RequestData {
  url = "";
  requestInit: RequestInit = {};
}

interface IServerAnswer<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface IServerAnswerDto<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  status?: number;
}

export class FetchService {
  private request: RequestData;

  constructor() {
    this.request = new RequestData();
    this.request.requestInit.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  }

  GET(fetchUrl: string) {
    this.request.url += fetchUrl;
    this.request.requestInit.method = "GET";
    return this;
  }

  POST(fetchUrl: string, body?: object) {
    this.request.requestInit.method = "POST";
    if (body) this.request.requestInit.body = JSON.stringify(body);
    this.request.url += fetchUrl;
    return this;
  }
  PUT(fetchUrl: string, body?: object) {
    this.request.requestInit.method = "PUT";
    if (body) this.request.requestInit.body = JSON.stringify(body);
    this.request.url += fetchUrl;
    return this;
  }
  DELETE(fetchUrl: string, body?: object) {
    this.request.requestInit.method = "DELETE";
    if (body) this.request.requestInit.body = JSON.stringify(body);
    this.request.url += fetchUrl;
    return this;
  }

  async send<T>(): Promise<IServerAnswerDto<T>> {
    try {
      const response = await fetch(this.request.url, this.request.requestInit);
      const responseData: IServerAnswer<T> = await response.json();

      if (response.ok) {
        if (responseData.code === 200)
          enqueueSnackbar(responseData.message, {
            variant: "success",
          });

        return {
          success: true,
          message: responseData.message,
          data: responseData.data,
          status: responseData.code,
        };
      } else {
        return {
          success: false,
          message: `${response.status}  - ${responseData.message}`,
          status: responseData.code,
        };
      }
    } catch (e) {
      return {
        success: false,
        message: `${e}`,
      };
    }
  }
}
