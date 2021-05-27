import config from "config";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { tokenData, SignedIdUser } from "shared/types/interfaces";

class Auth {
   static setToken(token: string) {
      return localStorage.setItem(config.storageTokenKey, token);
   }

   static getToken() {
      return localStorage.getItem(config.storageTokenKey);
   }

   static getTokenData() {
      const token = Auth.getToken();
      if (token !== null) {
         const data = jwt_decode<tokenData>(token);

         const user: SignedIdUser = {
            name: data.given_name,
            surname: data.family_name,
            email: data.email,
            login: data.unique_name,
         };

         return user;
      }
   }

   static isAuthenticated() {
      return !!Auth.getToken();
   }

   static logout() {
      localStorage.removeItem(config.storageTokenKey);
      window.location.reload();
   }
}

export default Auth;
