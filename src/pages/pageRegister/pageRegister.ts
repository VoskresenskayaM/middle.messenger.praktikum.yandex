import '../../css/style.scss';
import { Block } from '../../utils/Block.ts';
import FormTitle from '../../components/formTitle/formTitle.ts';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest.ts';
import RegForm from '../../components/regForm/regForm.ts';
import InputReg from '../../components/inputReg/inputReg.ts';
import FormValidator from '../../utils/FormValidator.ts';
import {
  formErrorReg, formErrorMessage, userFormSettings, ROUTES,
} from '../../utils/Constants.ts';
import RegFormQuestion from '../../components/regFormQuestion/regFormQuestion.ts';
import { AuthController } from '../../controllers/AuthController.ts';
import { source } from './source.ts';
import { connect, StoreState } from '../../utils/Store.ts';
import { router } from '../../utils/Router.ts';
import { ParseForm } from '../../utils/parseForm.ts';
import { DataSignup } from '../../api/AuthApi.ts';

type formType = HTMLFormElement | undefined;

const authController = new AuthController();

interface PropsRegister {
  attr: Record<string, string>,
  title: Block,
  form: Block,
  question: Block
}

const title = new FormTitle({
  title: 'Регистрация',
  className: 'login__form-title',
});

const inputEmail = new InputReg({
  label: 'Почта',
  type: 'email',
  inputName: 'email',
  reg: formErrorReg.email,
  error: formErrorMessage.emailError,
  attr: {
    class: 'login__input-block',

  },
});

const inputLogin = new InputReg({
  label: 'Логин',
  type: 'text',
  inputName: 'login',
  reg: formErrorReg.login,
  error: formErrorMessage.nameError,
  attr: {
    class: 'login__input-block',
  },
});

const inputFirstname = new InputReg({
  label: 'Имя',
  type: 'text',
  inputName: 'first_name',
  reg: formErrorReg.first_name,
  error: formErrorMessage.nameError,
  attr: {
    class: 'login__input-block',

  },
});

const inputSecondname = new InputReg({
  label: 'Фамилия',
  type: 'text',
  inputName: 'second_name',
  reg: formErrorReg.second_name,
  error: formErrorMessage.nameError,
  attr: {
    class: 'login__input-block',

  },
});

const inputPhone = new InputReg({
  label: 'Телефон',
  type: 'tel',
  inputName: 'phone',
  reg: formErrorReg.phone,
  error: formErrorMessage.phoneError,
  attr: {
    class: 'login__input-block',

  },
});

const inputPassword = new InputReg({
  label: 'Пароль',
  type: 'password',
  inputName: 'password',
  reg: formErrorReg.password,
  error: formErrorMessage.passwordError,
  attr: {
    class: 'login__input-block',

  },
});

const inputPassword2 = new InputReg({
  label: 'Пароль (еще раз)',
  type: 'password',
  inputName: 'password',
  reg: formErrorReg.password,
  error: formErrorMessage.passwordError,
  attr: {
    class: 'login__input-block',

  },
});

const button = new ButtonTest({
  text: 'Зарегистрироваться',
  attr: {
    class: 'user__form-button',
    type: 'submit',
  },
  events: {
    click: (event) => {
      event.preventDefault();
      const formEl = document.querySelector('.login__form') as formType;
      if (!formEl) return;
      const parseForm = new ParseForm(formEl);
      authController.signup(parseForm.getData() as DataSignup);
    },
  },
});

const form = new RegForm({
  inputEmail,
  inputLogin,
  inputFirstname,
  inputSecondname,
  inputPhone,
  inputPassword,
  inputPassword2,
  button,
  attr: {
    class: 'login__form',
  },
});

const question = new RegFormQuestion({
  text: 'Войти',
  attr: {
    class: 'login__question',
    href: '#',
  },
  events: {
    click: (event) => {
      if (event.target) router.go(ROUTES.SIGNIN);
    },
  },
});

const propsRegister : PropsRegister = {
  attr: {
    class: 'login',
  },
  title,
  form,
  question,
};

export class PageRegister extends Block {
  constructor() {
    super('main', propsRegister);
  }

  validateForm() {
    const validPageLogin = new FormValidator(userFormSettings);
    validPageLogin.enableValidation();
  }

  render() {
    return this.compile(source, this._props);
  }
}
const mapStateToProps = (state: StoreState) => ({ ...state });
export const PageRegisterConnect = connect(mapStateToProps)(PageRegister);
