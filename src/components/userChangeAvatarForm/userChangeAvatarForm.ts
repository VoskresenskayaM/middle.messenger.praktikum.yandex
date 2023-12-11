import { Block } from '../../utils/Block';
import { source } from './source';
import { UserInput } from '../../components/userInput/userInput';
import { StoreState, connect } from '../../utils/Store';
import { formErrorReg, formErrorMessage } from '../../utils/Constants';
import ButtonTest from '../test_sprint_2_button/ButtonTest';
import { ParseForm } from '../../utils/parseForm';
import { User, formType } from '../../utils/Types';
import { userController } from '../../controllers/UserController';

/* interface Props {
    attr: Record<string, string>,
    emailInput:Block,
    loginInput:Block,
    firstNameInput:Block,
    secondNameInput:Block,
    displayInput:Block,
    phoneInput:Block,
  } */

export class UserFormChangeAvatar extends Block {
  init() {
    this._children.button = new ButtonTest({
      text: 'Сохранить',
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
