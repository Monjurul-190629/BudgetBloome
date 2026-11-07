export type ANY = any;

export type API_ERROR = {
  message?: string;
  detail?: string;
  error?: string;
};

export type PROFILE = {
   name: string;
   email: string;
   address: string;
   phone?: string;
   image?: string;
}