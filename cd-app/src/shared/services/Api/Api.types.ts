export interface RegisterPayload {
   email: string;
   name: string;
   login: string;
   password: string;
   surname: string;
}
export interface LoginPayload {
   login: string;
   password: string;
}

export interface LoginResponse {
   token: string;
   tokenExpirationTime: number;
}
