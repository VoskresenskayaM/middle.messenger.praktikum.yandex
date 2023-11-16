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

const input = new InputReg({
  label: 'Логин',
  type: 'text',
  inputName: 'login',
  reg: formErrorReg.email,
  error: formErrorMessage.emailError,
  attr: {
    class: 'login__input-block',
  },
});

const input2 = new InputReg({
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
  text: 'Сохранить',
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
  inputLogin: input,
  inputPassword: input2,
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
