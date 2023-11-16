import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import { currentUser } from '../../utils/Constants';
import BackPanel from '../../components/backPanel/backPanel';
import NotUserFoto from '../../components/notUserFoto/notUserFoto';
import UserProfile from '../../components/userProfile/userProfile';
import UserName from '../../components/userName/userName';
import UserInputDisabled from '../../components/userInputDisabled/userInputDisabled';
import UserForm from '../../components/userForm/userForm';

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

const userName = new UserName({
  attr: {
    class: 'user__name',
  },
  name: currentUser.first_name,
});

const emailInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Почта',
  inputClass: 'email',
  inputValue: currentUser.email,

});

const loginInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Логин',
  inputClass: 'login',
  inputValue: currentUser.login,

});

const firstNameInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Имя',
  inputClass: 'first_name',
  inputValue: currentUser.first_name,
});

const secondNameInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Фамилия',
  inputClass: 'second_name',
  inputValue: currentUser.second_name,
});

const displayInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Имя в чате',
  inputClass: 'display_name',
  inputValue: currentUser.display_name,
});

const phoneInput = new UserInputDisabled({
  attr: {
    class: 'user__input-block',
  },
  inputName: 'Телефон',
  inputClass: 'phone ',
  inputValue: currentUser.phone,
});

const userForm = new UserForm({
  attr: {
    class: 'user__info-form',
  },
  emailInput,
  loginInput,
  firstNameInput,
  secondNameInput,
  displayInput,
  phoneInput,
  isUdate: false,
});

const userProfile = new UserProfile({
  attr: {
    class: 'user',
  },
  backPanel: panel,
  userFoto,
  userName,
  userForm,

});

render('#app', userProfile);
