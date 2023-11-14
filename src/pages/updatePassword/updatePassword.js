import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import { currentUser } from '../../utils/Constants';
import BackPanel from '../../components/backPanel/backPanel';
import NotUserFoto from '../../components/notUserFoto/notUserFoto';
import UserPasswordUpdate from '../../components/userPasswordUpdate/userPasswordUpdate';
import UserInput from '../../components/userInput/userInput';
import userPasswordUpdateForm from '../../components/userPassworsUpdateForm/userPasswordUpdateForm';
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

const oldPasswordInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Старый пароль",
    inputClass: "oldPassword",
    reg: formErrorReg.password,
    type: "password",
    error: formErrorMessage.passwordError
})

const newPasswordInput = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Новый пароль",
    inputClass: "newPassword",
    reg: formErrorReg.password,
    type: "password",
    error: formErrorMessage.passwordError
})

const newPasswordInput2 = new UserInput({
    attr: {
        class: "user__input-error-block"
    },
    inputName: "Повторите новый пароль",
    inputClass: "newPassword",
    reg: formErrorReg.password,
    type: "password",
    error: formErrorMessage.passwordError
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

const userForm = new userPasswordUpdateForm({
    attr: {
        class: "user__info-form"
    },
    oldPassword: oldPasswordInput,
    newPassword: newPasswordInput,
    newPassword2: newPasswordInput2,
    button: button,
})

const userUpdate = new UserPasswordUpdate({
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

