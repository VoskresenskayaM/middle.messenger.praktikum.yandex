import { Block } from '../../../utils/Block';
import { source } from './source';

import ButtonTest from '../../test_sprint_2_button/ButtonTest';
import InputReg from '../../inputReg/inputReg';
import { formType } from '../../../utils/Types';
import { chatController } from '../../../controllers/ChatController';
import { userController } from '../../../controllers/UserController';
import { StoreState, connect } from '../../../utils/Store';

export class DeleteUserForm extends Block {
  init() {
    this._props.attr = { class: 'login__form-delete-user' };
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
      text: 'Удалить участника',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
        click: async (event : Event) => {
          event.preventDefault();
          const form = document.querySelector('.login__form-delete-user') as formType;
          if (!form) return;
          const input = form.querySelector('.login__input') as formType;
          if (!input) return;
          const user = await userController.getUserByLogin({ login: input.value });
          if (user.length !== 0) {
            const data = { users: [user[0].id], chatId: this._props.chatId };
            await chatController.addUserInChat(data);
            await chatController.getUsersFromChat();
          // eslint-disable-next-line no-alert
          } else alert('Нет пользователя с таким именем');
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
export const DeleteUserFormConnect = connect(mapStateToProps)(DeleteUserForm);
