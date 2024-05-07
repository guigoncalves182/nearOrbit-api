export interface IUser {
  id: string;
  fullName: string;
  password: string;
  email: string;
  isActive: boolean;
  account: string[];
  currency: number;
}
