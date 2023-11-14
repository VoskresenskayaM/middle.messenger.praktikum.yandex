import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import FormTitle from '../../components/formTitle/formTitle';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import RegForm from '../../components/regForm/regForm';
import InputReg from '../../components/inputReg/inputReg';
import FormValidator from '../../utils/FormValidator';
import { regFormSettings, formErrorReg, formErrorMessage  } from '../../utils/Constants';
import regFormQuestion from '../../components/regFormQuestion/regFormQuestion';


const title = new FormTitle({
    title: "Вход",
    className: "login__form-title",
});

render(".login__form-block", title);

const input = new InputReg({
    label: "Логин",
    type: "text",
    inputName: "login",
    reg: formErrorReg.email,
    error: formErrorMessage.emailError,
    attr: {
        class: "login__input-block",
    }
})

const input2 = new InputReg({
    label: "Пароль",
    type: "password",
    inputName: "password",
    reg: formErrorReg.password,
    error: formErrorMessage.passwordError,
    attr: {
        class: "login__input-block", 
       
    }
})

const button = new ButtonTest({
    text: "Сохранить",
    attr: {
      class: "user__form-button",
      type:"submit", 
    },
    events: {
      // Названия события точно такие же, как и у первого аргумента addEventListener: 
      // click, mouseEnter, ...
      click: event => {
        event.preventDefault()
        const form = document.querySelector('.login__form')
        const formData = new FormData(form)
        for(let [name, value] of formData) {
            console.log(`${name} = ${value}`);
          }
      }
    }
  });

const form = new RegForm({
    inputLogin: input,
    inputPassword: input2,
    button: button,
        attr: {
    class: "login__form"
}
})

render(".login__form-block", form);

const valid = new FormValidator(regFormSettings)
valid.enableValidation()

const question = new regFormQuestion({
   text: "Нет аккаунта?", 
    attr: {
        class: "login__question",
        href:"/src/pages/register/register.html"
      }
})

render(".login__form-block", question);
