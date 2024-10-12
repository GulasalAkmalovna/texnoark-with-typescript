export interface ISignIn {
   phone_number: string;
   password: string;
}

export interface ISignUp extends ISignIn {
   first_name: string;
   last_name: string;
   email: string;
}
