import { BaseApi } from './BaseApi';
import { User } from '../utils/Types';

export type DataSignup = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type ResponseSignup = {
    id: number;
};

export type DataSignin = {
    login: string;
    password: string;}

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  public signup(data: DataSignup): Promise<{id: number}> {
    return this.http.post('/signup', { data });
  }

  public signin(data: DataSignin): Promise<unknown> {
    return this.http.post('/signin', { data });
  }

  public logout(): Promise<unknown> {
    return this.http.post('/logout');
  }

  // Promise<User > не пропускает защита типов
  public read(): Promise<User> {
    return this.http.get('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export const authApi = new AuthApi();
