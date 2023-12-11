import { Block } from '../../utils/Block';
import { source } from './source';
import { UserInput } from '../../components/userInput/userInput';
import { StoreState, connect } from '../../utils/Store';
import { formErrorReg, formErrorMessage } from '../../utils/Constants';
import ButtonTest from '../test_sprint_2_button/ButtonTest';
import { ParseForm } from '../../utils/parseForm';
import { User, formType } from '../../utils/Types';
import { userController } from '../../controllers/UserController';
import { DataChangeProfile } from '../../api/UserApi';

/*interface Props {
    attr: Record<string, string>,
    emailInput:Block,
    loginInput:Block,
    firstNameInput:Block,
    secondNameInput:Block,
    displayInput:Block,
    phoneInput:Block,
  }*/

export class UserFormChangeProfile extends Block {
  /* constructor(props:Props) {
    super('form', props);
  } */

  init() {
    this._children.emailInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Почта',
      inputClass: 'email',
      inputValue: this._props.user.email,
      reg: formErrorReg.email,
      type: 'email',
      error: formErrorMessage.emailError,
    });

    this._children.loginInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Логин',
      inputClass: 'login',
      inputValue: this._props.user.login,
      reg: formErrorReg.login,
      type: 'text',
      error: formErrorMessage.nameError,
    });

    this._children.firstNameInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Имя',
      inputClass: 'first_name',
      inputValue: this._props.user.first_name,
      reg: formErrorReg.first_name,
      type: 'text',
      error: formErrorMessage.nameError,
    });

    this._children.secondNameInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Фамилия',
      inputClass: 'second_name',
      inputValue: this._props.user.second_name,
      reg: formErrorReg.second_name,
      type: 'text',
      error: formErrorMessage.nameError,
    });

    this._children.displayInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Имя в чате',
      inputClass: 'display_name',
      inputValue: this._props.user.display_name,
      reg: formErrorReg.first_name,
      type: 'text',
      error: formErrorMessage.nameError,
    });

    this._children.phoneInput = new UserInput({
      attr: {
        class: 'user__input-error-block',
      },
      inputName: 'Телефон',
      inputClass: 'phone',
      inputValue: this._props.user.phone,
      reg: formErrorReg.phone,
      type: 'tel',
      error: formErrorMessage.phoneError,
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
          const changeProfileform = document.querySelector('.user__info-form') as formType;
          if (!changeProfileform) return;
          const parseForm = new ParseForm(changeProfileform);
          userController.changeProfile(parseForm.getData() as DataChangeProfile)
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { user: state.user }; }

export const UserFormChangeProfileConnect = connect(mapStateToProps)(UserFormChangeProfile);
