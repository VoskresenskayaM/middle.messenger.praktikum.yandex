import {
  AuthApi, DataSignup, DataSignin, authApi,
} from '../api/AuthApi';
import { ROUTES } from '../utils/Constants';
import { router } from '../utils/Router';
import { store } from '../utils/Store';

export class AuthController {
  private _api: AuthApi;

  constructor() {
    this._api = authApi;
  }

  public async signup(data: DataSignup) {
    try {
      await this._api.signup(data);
      await this.fetchUser();
      router.go(ROUTES.PROFILE);
    } catch (error) {
      console.log(error);
      alert('Не удалось зарегистрироваться');
    }
  }

  async signin(data: DataSignin) {
    try {
      await this._api.signin(data);
      await this.fetchUser();
      router.go(ROUTES.PROFILE);
    } catch (error) {
      console.log(error);
      alert('Не удалось авторизоваться');
    }
  }

  async logout() {
    try {
      await this._api.logout();
      store.set('isAuth', false);
      store.set('user', {
        avatar: '',
        phone: '',
        email: '',
        login: '',
        id: -1,
        second_name: '',
        first_name: '',
        display_name: '',
    });
      router.go(ROUTES.SIGNIN);
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-alert
      alert('Не удалось авторизоваться');
    }
  }

  private async fetchUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await this._api.read();
      store.set('user', user);
      store.set('isAuth', true);
    } catch (error) {
      console.log(error);
    }
  }
}
