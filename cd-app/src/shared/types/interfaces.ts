import { JwtPayload } from "jwt-decode";

export interface tokenData extends JwtPayload {
   unique_name: string;
   email: string;
   given_name: string;
   family_name: string;
}

export interface SignedIdUser {
   name: string;
   surname: string;
   email: string;
   login: string;
}

export interface Album {
   id: number;
   title: string;
   version: string;
   year: number;
   tracks: Track[];
   artists: Artist[];
}

export interface Track {
   id: number;
   albumId: number;
   title: string;
   year: number;
   duration: string;
   album: Album;
}

export interface Artist {
   id: number;
   name: string;
   surname: string;
   gender: string;
   musicCategory: string;
   albums: Album[];
}
