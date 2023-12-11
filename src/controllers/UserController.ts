import {
  UserApi, userApi, DataChangePassword, DataChangeProfile,
} from '../api/UserApi';
import { ROUTES } from '../utils/Constants';
import { router } from '../utils/Router';
import { store } from '../utils/Store';
import { User } from '../utils/Types';

class UserController {
  private _api: UserApi;

  constructor() {
    this._api = userApi;
  }

  async changeProfile(data: DataChangeProfile) {
    try {
      const user = await this._api.changeProfile(data);
      store.set('user', user);
      alert('Данные успешно изменены');
    } catch {
      alert('Не удалось изменить данные пользователя');
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const user = await this._api.changeAvatar(data);
      store.set('user', user);
    } catch {
      alert('Не удалось изменить аватар пользователя');
    }
  }

  async changePassword(data: DataChangePassword) {
    try {
      await this._api.changePassword(data);
      alert('Пароль успешно изменен');
    } catch {
      alert('Не удалось изменить пароль пользователя');
    }
  }

  async getUserByLogin(data: { login: string }): Promise<User[]> {
    return this._api.getUserByLogin(data);
  }
}

export const userController = new UserController();
