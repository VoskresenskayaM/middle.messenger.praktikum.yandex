import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import FormTitle from '../../components/formTitle/formTitle';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import RegForm from '../../components/regForm/regForm';
import InputReg from '../../components/inputReg/inputReg';
import FormValidator from '../../utils/FormValidator';
import { regFormSettings, formErrorReg, formErrorMessage } from '../../utils/Constants';
import RegFormQuestion from '../../components/regFormQuestion/regFormQuestion';

type formType = HTMLFormElement | undefined;

const title = new FormTitle({
  title: 'Регистрация',
  className: 'login__form-title',
});

render('.login__form-block', title);

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
    // Названия события точно такие же, как и у первого аргумента addEventListener:
    // click, mouseEnter, ...
    click: (event) => {
      event.preventDefault();
      const formEl = document.querySelector('.login__form') as formType;
      const formData = new FormData(formEl);
      // eslint-disable-next-line no-restricted-syntax
      for (const [name, value] of formData) {
        // eslint-disable-next-line no-console
        console.log(`${name} = ${value}`);
      }
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

render('.login__form-block', form);

const valid = new FormValidator(regFormSettings);
valid.enableValidation();

const question = new RegFormQuestion({
  text: 'Войти',
  attr: {
    class: 'login__question',
    href: '/src/pages/register/register.html',
  },
});

render('.login__form-block', question);
