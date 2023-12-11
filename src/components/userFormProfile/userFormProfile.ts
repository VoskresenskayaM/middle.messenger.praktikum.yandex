import { Block } from '../../utils/Block';
import { source } from './source';
import { UserInputDisabled } from '../../components/userInputDisabled/userInputDisabled';
import { StoreState, connect } from '../../utils/Store';


interface Props {
    attr: Record<string, string>,
    emailInput:Block,
    loginInput:Block,
    firstNameInput:Block,
    secondNameInput:Block,
    displayInput:Block,
    phoneInput:Block,
  }

export class UserForm extends Block {
  init() {
    this._children.emailInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Имя в чате',
      inputClass: 'display_name',
      inputValue: this._props.user.first_name,
    });
    this._children.loginInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Логин',
      inputClass: 'login',
      inputValue: this._props.user.login,
    });
    this._children.firstNameInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Имя',
      inputClass: 'first_name',
      inputValue: this._props.user.first_name,
    });
    this._children.secondNameInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Фамилия',
      inputClass: 'second_name',
      inputValue: this._props.user.second_name,
    });
    this._children.displayInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Имя в чате',
      inputClass: 'display_name',
      inputValue: this._props.user.display_name,
    });
    this._children.phoneInput = new UserInputDisabled({
      attr: { class: 'user__input-block' },
      inputName: 'Телефон',
      inputClass: 'phone ',
      inputValue: this._props.user.phone,
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { user: state.user }; }

export const UserFormConnect = connect(mapStateToProps)(UserForm);
