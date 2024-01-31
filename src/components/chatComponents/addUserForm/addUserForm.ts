import { Block } from '../../../utils/Block';
import { source } from './source';

import ButtonTest from '../../test_sprint_2_button/ButtonTest';
import InputReg from '../../inputReg/inputReg';
import { formType } from '../../../utils/Types';
import { chatController } from '../../../controllers/ChatController';
import { userController } from '../../../controllers/UserController';
import { StoreState, connect } from '../../../utils/Store';

export class AddUserForm extends Block {
  init() {
    this._props.attr = { class: 'login__form-add-user' };
    this._children.input = new InputReg({
      label: '',
      type: 'text',
      inputName: 'chatName',
      reg: '',
      error: '',
      attr: {
        class: 'login__input-block',

      },
    });

    this._children.button = new ButtonTest({
      text: 'Добавить участника',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
        click: async (event : Event) => {
          event.preventDefault();
          const form = document.querySelector('.login__form-add-user') as formType;
          if (!form) return;
          const input = form.querySelector('.login__input') as formType;
          if (!input) return;
          const users = await userController.getUserByLogin({ login: input.value });
          const data = { users: [users[0].id], chatId: this._props.chatId };
          await chatController.addUserInChat(data);
          await chatController.getUsersFromChat();
          form.reset();
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    chatId: state.activeChatId,
  };
}
export const AddUserFormConnect = connect(mapStateToProps)(AddUserForm);
