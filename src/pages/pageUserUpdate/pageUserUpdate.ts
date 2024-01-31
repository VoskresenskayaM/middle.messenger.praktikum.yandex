import { source } from './source';
import { Block } from '../../utils/Block';
import BackPanel from '../../components/backPanel/backPanel';
import { NotUserFotoConnect } from '../../components/notUserFoto/notUserFoto';
import { UserFormChangeProfileConnect } from '../../components/userFormChangeProfile/userFormChangeProfile';
import { UserFormChangeAvatarConnect } from '../../components/userChangeAvatarForm/userChangeAvatarForm';
import FormValidator from '../../utils/FormValidator';
import { userFormSettings } from '../../utils/Constants';

export class UserUpdate extends Block {
  init() {
    this._meta.tagName = 'main';
    this._children.userFoto = new NotUserFotoConnect('div', {
      attr: {
        class: 'user__not-foto-block',
      },
      events: {
        click: () => {
          const foto = document.querySelector('.user__avatar') as Element;
          foto.classList.add('user__avatar-active');
        },
      },
    });

    this._props.attr = { class: 'user' };
    this._children.backPanel = new BackPanel({ attr: { class: 'user__back-panel' } });
    this._children.userForm = new UserFormChangeProfileConnect(
      'form',
      { attr: { class: 'user__info-form' } },
    );
    this._children.changeAvatarForm = new UserFormChangeAvatarConnect(
      'form',
      { attr: { class: 'user__avatar' } },
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
