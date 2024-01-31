import '../../css/style.scss';
import { Block } from '../../utils/Block.ts';
import FormTitle from '../../components/formTitle/formTitle.ts';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest.ts';
import RegForm from '../../components/regForm/regForm.ts';
import InputReg from '../../components/inputReg/inputReg.ts';
import RegFormQuestion from '../../components/regFormQuestion/regFormQuestion.ts';
import { AuthController } from '../../controllers/AuthController.ts';
import { source } from './source.ts';
import FormValidator from '../../utils/FormValidator.ts';
import {
  regFormSettings, ROUTES, formErrorReg, formErrorMessage,
} from '../../utils/Constants.ts';
import { router } from '../../utils/Router.ts';
import { ParseForm } from '../../utils/parseForm.ts';
import { DataSignin } from '../../api/AuthApi.ts';
import { formType } from '../../utils/Types.ts';

interface PropsLogin {
  attr: Record<string, string>,
  title: Block,
  form: Block,
  question: Block
}

const authController = new AuthController();

const title = new FormTitle({
  title: 'Вход',
  className: 'login__form-title',
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

const button = new ButtonTest({
  text: 'Войти',
  attr: {
    class: 'user__form-button',
    type: 'submit',
  },
  events: {
    click: (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      const form = document.querySelector('.login__form') as formType;
      if (!form) return;
      const parseForm = new ParseForm(form);
      authController.signin(parseForm.getData() as DataSignin);
    },
  },
});

const form = new RegForm({
  inputLogin,
  inputPassword,
  button,
  attr: {
    class: 'login__form',
  },
});

const question = new RegFormQuestion({
  text: 'Нет аккаунта?',
  attr: {
    class: 'login__question',
    href: '#',
  },
  events: {
    click: (event) => {
      if (event.target) router.go(ROUTES.SIGNUP);
    },
  },
});

const propsLogin : PropsLogin = {
  attr: {
    class: 'login',
  },
  title,
  form,
  question,
};

export class PageLogin extends Block {
  constructor() {
    super('main', propsLogin);
  }

  validateForm() {
    const validPageLogin = new FormValidator(regFormSettings);
    validPageLogin.enableValidation();
  }

  render() {
    return this.compile(source, this._props);
  }
}
/* const mapStateToProps = (state: StoreState) => ({ ...state });
export const PageLoginConnect = connect(mapStateToProps)(PageLogin); */
