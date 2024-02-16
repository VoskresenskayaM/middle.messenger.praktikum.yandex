import { source } from './source';
import { Block } from '../../utils/Block';
import BackPanel from '../../components/backPanel/backPanel';
import { NotUserFotoConnect } from '../../components/notUserFoto/notUserFoto';
import { UserFormChangePasswordConnect } from '../../components/userFormChangePassword/userFormChangePassword';
import FormValidator from '../../utils/FormValidator';
import { userFormSettings } from '../../utils/Constants';

export class UserUpdatePassword extends Block {
  init() {
    this._meta.tagName = 'main';
    this._children.userFoto = new NotUserFotoConnect('div', {
      attr: {
        class: 'user__not-foto-block',
      },
    });
    this._props.attr = { class: 'user' };
    this._children.backPanel = new BackPanel({ attr: { class: 'user__back-panel' } });
    this._children.userForm = new UserFormChangePasswordConnect(
      'form',
      { attr: { class: 'user__info-form' } },
    );
  }

  validateForm() {
    const validPageLogin = new FormValidator(userFormSettings);
    validPageLogin.enableValidation();
  }

  render() {
    return this.compile(source, this._props);
  }
}
