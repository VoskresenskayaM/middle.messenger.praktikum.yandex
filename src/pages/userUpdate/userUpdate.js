import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import { currentUser } from '../../utils/Constants';
import BackPanel from '../../components/backPanel/backPanel';
import NotUserFoto from '../../components/notUserFoto/notUserFoto';
import UserUpdate from '../../components/userUpdate/userUpdate';
import UserInput from '../../components/userInput/userInput';
import UserForm from '../../components/userForm/userForm';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import FormValidator from '../../utils/FormValidator';
import { userFormSettings } from '../../utils/Constants';
import { formErrorReg } from '../../utils/Constants';
import { formErrorMessage } from '../../utils/Constants';
const panel = new BackPanel({
    attr: {
        class: "user__back-panel"
    }
});

const userFoto = new NotUserFoto({
    attr: {
        class: "user__not-foto-block"
    }
})

const emailInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Почта",
    inputClass: "email",
    inputValue: currentUser.email,
    reg: formErrorReg.email,
    type: "email",
    error: formErrorMessage.emailError
})

const loginInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Логин",
    inputClass: "login",
    inputValue: currentUser.login,
    reg: formErrorReg.login,
    type: "text",
    error: formErrorMessage.nameError
})

const firstNameInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Имя",
    inputClass: "first_name",
    inputValue: currentUser.first_name,
    reg: formErrorReg.first_name,
    type: "text",
    error: formErrorMessage.nameError
})

const secondNameInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Фамилия",
    inputClass: "second_name",
    inputValue: currentUser.second_name,
    reg: formErrorReg.second_name,
    type: "text",
    error: formErrorMessage.nameError
})

const displayInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Имя в чате",
    inputClass: "display_name",
    inputValue: currentUser.display_name,
    reg: formErrorReg.first_name,
    type: "text",
    error: formErrorMessage.nameError
})

const phoneInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Телефон",
    inputClass: "phone",
    inputValue: currentUser.phone,
    reg: formErrorReg.phone,
    type: "tel",
    error: formErrorMessage.phoneError
})

const button = new ButtonTest({
    text: "Сохранить",
    attr: {
        class: "user__form-button",
        type: "submit",
    },
    events: {
        // Названия события точно такие же, как и у первого аргумента addEventListener: 
        // click, mouseEnter, ...
        click: event => {
            event.preventDefault()
            const form = document.querySelector('.user__info-form')
            const formData = new FormData(form)
            for (let [name, value] of formData) {
                console.log(`${name} = ${value}`);
            }
        }
    }
});

const userForm = new UserForm({
    attr: {
        class: "user__info-form"
    },
    emailInput: emailInput,
    loginInput: loginInput,
    firstNameInput: firstNameInput,
    secondNameInput: secondNameInput,
    displayInput: displayInput,
    phoneInput: phoneInput,
    button: button,
    isUdate: true
})

const userUpdate = new UserUpdate({
    attr: {
        class: "user"
    },
    backPanel: panel,
    userFoto: userFoto,
    userForm: userForm
})

render("#app", userUpdate);

const valid = new FormValidator(userFormSettings)
valid.enableValidation()

