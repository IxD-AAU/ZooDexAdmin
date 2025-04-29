export interface User {
  Login: string;
  FirstName: string;
  LastName: string;
  Mail: string;
  Job: string;
}

export interface Personale {
  [key: string]: User;
}

export interface PageText extends User{
  PERSONALE: Personale;
  [key: number]: any;
  Username: string;
}

