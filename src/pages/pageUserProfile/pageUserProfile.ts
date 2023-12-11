import { source } from './source';
import { Block } from '../../utils/Block';
import BackPanel from '../../components/backPanel/backPanel';
import { UserNameConnect } from '../../components/userName/userName';
import { UserFormConnect } from '../../components/userFormProfile/userFormProfile';
import { ProfileLink } from '../../components/profileLink/profileLink';
import { router } from '../../utils/Router';
import { ROUTES } from '../../utils/Constants';
import { NotUserFotoConnect } from '../../components/notUserFoto/notUserFoto';
import { AuthController } from '../../controllers/AuthController';

const authController =  new AuthController()

export class UserProfile extends Block {
  
  init() {

    this._meta.tagName = 'main';
    this._children.userFoto = new NotUserFotoConnect('div', {
      attr: {
        class: 'user__not-foto-block',
      },
    });

    this._props.attr = { class: 'user' };
    this._children.backPanel = new BackPanel({ attr: { class: 'user__back-panel' } });
    this._children.userName = new UserNameConnect('p', { attr: { class: 'user__name' } });
    this._children.userForm = new UserFormConnect('form', { attr: { class: 'user__info-form' } });
    this._children.changeUsetData = new ProfileLink({
      attr: { class: 'user__link', href: '#' },
      text: 'Изменить данные',
      events: {
        click: (event) => {
          if (event.target) router.go(ROUTES.PROFILE_EDIT_DATA);
        },
      },
    });
    this._children.changeUserPassword = new ProfileLink({
      attr: { class: 'user__link', href: '#' },
      text: 'Изменить пароль',
      events: {
        click: (event) => {
          if (event.target) router.go(ROUTES.PROFILE_EDIT_PASSWORD);
        },
      },
    });
    this._children.logout = new ProfileLink({
      attr: { class: 'user__link', href: '#' },
      text: 'Выйти',
      events: {
        click: (event) => {
          if (event.target) authController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}
