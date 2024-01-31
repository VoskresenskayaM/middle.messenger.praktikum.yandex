import { BaseApi } from './BaseApi';
import { User } from '../utils/Types';

export interface DataChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type DataChangeProfile = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};
export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  changeProfile(data: DataChangeProfile) {
    return this.http.put('/profile', { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  changePassword(data: DataChangePassword) {
    return this.http.put('/password', { data });
  }

  getUserById(id: number): Promise<User> {
    return this.http.get(`/${id}`);
  }

  getUserByLogin(data: { login: string }): Promise<User[]> {
    return this.http.post('/search', { data });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}

export const userApi = new UserApi();
