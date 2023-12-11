import { Block } from '../../utils/Block';
import { source } from './source';
import { UserInput } from '../../components/userInput/userInput';
import { StoreState, connect } from '../../utils/Store';
import { formErrorReg, formErrorMessage } from '../../utils/Constants';
import ButtonTest from '../test_sprint_2_button/ButtonTest';
import { ParseForm } from '../../utils/parseForm';
import { User, formType } from '../../utils/Types';
import { userController } from '../../controllers/UserController';
import { DataChangePassword } from '../../api/UserApi';

/* interface Props {
    attr: Record<string, string>,
    emailInput:Block,
    loginInput:Block,
    firstNameInput:Block,
    secondNameInput:Block,
    displayInput:Block,
    phoneInput:Block,
  } */

export class UserFormChangePassword extends Block {
  /* constructor(props:Props) {
    super('form', props);
  } */

  init() {
    this._children.oldPasswordInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Старый пароль',
      inputClass: 'oldPassword',
      reg: formErrorReg.password,
      type: 'password',
      error: formErrorMessage.passwordError,
    });

    this._children.newPasswordInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Новый пароль',
      inputClass: 'newPassword',
      reg: formErrorReg.password,
      type: 'password',
      error: formErrorMessage.passwordError,
    });

    this._children.newPasswordInput2 = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Повторите новый пароль',
      inputClass: 'newPassword',
      reg: formErrorReg.password,
      type: 'password',
      error: formErrorMessage.passwordError,
    });

    this._children.button = new ButtonTest({
      text: 'Сохранить',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.querySelector('.user__info-form') as formType;
          if (!form) return;
          const parseForm = new ParseForm(form);
          userController.changePassword(parseForm.getData() as unknown as DataChangePassword);
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { user: state.user }; }

export const UserFormChangePasswordConnect = connect(mapStateToProps)(UserFormChangePassword);
