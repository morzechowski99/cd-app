import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config from "config";
//import Auth from "../Auth";

class Api {
   protected api: AxiosInstance = axios.create({ baseURL: config.apiUrl });

   constructor() {
      // this.api.interceptors.request.use(this.authenticate);
      // this.api.interceptors.response(this.refreshToken)
   }

   private authenticate(config: AxiosRequestConfig) {
      const token = Auth.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
   }

   public async createUser(user: UserPayload) {
      const response = await this.api.post<UserPayload>(
         "/api/User/Register",
         user
      );
      return response;
   }

   public async activateUser(token: string, values: SetPasswordValues) {
      const data: ActivateUserPayload = {
         token: token,
         password: values.password,
         passwordConfirmation: values.passwordConfirmation,
      };
      const response = await this.api.post("/api/User/Activate", data);
      return response;
   }
}

export default Api;
