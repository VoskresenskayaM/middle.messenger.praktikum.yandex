import { Block } from '../../utils/Block';
import { source } from './source';
import { StoreState, connect } from '../../utils/Store';
import ButtonTest from '../test_sprint_2_button/ButtonTest';
import { userController } from '../../controllers/UserController';
import { formType } from '../../utils/Types';

export class UserFormChangeAvatar extends Block {
  init() {
    this._children.button = new ButtonTest({
      text: 'Изменить аватар',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
        click: (event) => {
          event.preventDefault();
          const formChangeAvatar = document.querySelector('#file') as formType;
          if (!formChangeAvatar) return;
          const file = formChangeAvatar.files[0];
          const formData = new FormData();
          formData.append('avatar', file);
          userController.changeAvatar(formData);
          const form = document.querySelector('.user__avatar') as Element;
          form.classList.remove('user__avatar-active');
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { user: state.user }; }
export const UserFormChangeAvatarConnect = connect(mapStateToProps)(UserFormChangeAvatar);
