import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import {
  userFormSettings, formErrorReg, formErrorMessage,
} from '../../utils/Constants';
import BackPanel from '../../components/backPanel/backPanel';
import NotUserFoto from '../../components/notUserFoto/notUserFoto';
import UserPasswordUpdate from '../../components/userPasswordUpdate/userPasswordUpdate';
import UserInput from '../../components/userInput/userInput';
import UserPasswordUpdateForm from '../../components/userPassworsUpdateForm/userPasswordUpdateForm';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import FormValidator from '../../utils/FormValidator';

type form = HTMLFormElement | undefined;

const panel = new BackPanel({
  attr: {
    class: 'user__back-panel',
  },
});

const userFoto = new NotUserFoto({
  attr: {
    class: 'user__not-foto-block',
  },
});

const oldPasswordInput = new UserInput({
  attr: {
    class: 'user__input-error-block',
  },
  inputName: 'Старый пароль',
  inputClass: 'oldPassword',
  reg: formErrorReg.password,
  type: 'password',
  error: formErrorMessage.passwordError,
});

const newPasswordInput = new UserInput({
  attr: {
    class: 'user__input-error-block',
  },
  inputName: 'Новый пароль',
  inputClass: 'newPassword',
  reg: formErrorReg.password,
  type: 'password',
  error: formErrorMessage.passwordError,
});

const newPasswordInput2 = new UserInput({
  attr: {
    class: 'user__input-error-block',
  },
  inputName: 'Повторите новый пароль',
  inputClass: 'newPassword',
  reg: formErrorReg.password,
  type: 'password',
  error: formErrorMessage.passwordError,
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
      const formEl = document.querySelector('.user__info-form') as form;
      const formData = new FormData(formEl);
      // eslint-disable-next-line no-restricted-syntax
      for (const [name, value] of formData) {
        // eslint-disable-next-line no-console
        console.log(`${name} = ${value}`);
      }
    },
  },
});

const userForm = new UserPasswordUpdateForm({
  attr: {
    class: 'user__info-form',
  },
  oldPassword: oldPasswordInput,
  newPassword: newPasswordInput,
  newPassword2: newPasswordInput2,
  button,
});

const userUpdate = new UserPasswordUpdate({
  attr: {
    class: 'user',
  },
  backPanel: panel,
  userFoto,
  userForm,
  button,
});

render('#app', userUpdate);

const valid = new FormValidator(userFormSettings);
valid.enableValidation();
