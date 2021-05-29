import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config from "config";
import { AddAlbumValues } from "modules/albums/components/AddAlbumForm/AddAlbumForm.utils";
import { Album, Artist } from "shared/types/interfaces";
import Auth from "../Auth";
import { LoginPayload, LoginResponse, RegisterPayload } from "./Api.types";
//import Auth from "../Auth";

class Api {
   protected api: AxiosInstance = axios.create({ baseURL: config.apiUrl });

   constructor() {
      this.api.interceptors.request.use(this.authenticate);
   }

   private authenticate(config: AxiosRequestConfig) {
      const token = Auth.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
   }

   public async login(payload: LoginPayload) {
      const { data } = await this.api.post<LoginResponse>(
         "/user/login",
         payload
      );
      Auth.setToken(data.token);
      return;
   }

   public async createUser(user: RegisterPayload) {
      const response = await this.api.post<RegisterPayload>(
         "/user/Register",
         user
      );
      return response;
   }

   public async getAlbums() {
      const response = await this.api.get<Album[]>("/albums");
      return response;
   }

   public async getArtists() {
      const response = await this.api.get<Artist[]>("/artists");
      return response;
   }

   public async createAlbum(album: AddAlbumValues) {
      const response = await this.api.post<Artist[]>("/albums", album);
      return response;
   }

   public async deleteAlbum(id: number) {
      const response = await this.api.delete("/albums?id=" + id);
      return response;
   }
}

export default Api;
