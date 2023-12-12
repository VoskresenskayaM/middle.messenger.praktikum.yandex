import { Block } from '../../utils/Block';
import { source } from './source';

import ButtonTest from '../test_sprint_2_button/ButtonTest';
import InputReg from '../inputReg/inputReg';
import { formType } from '../../utils/Types';
import { chatController } from '../../controllers/ChatController';


export class AddChatForm extends Block {
  init() {
    this._props.attr = {class: 'login__form'}
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
      text: 'Добавить чат',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
      click: async (event) => {
          event.preventDefault();
          const input = document.querySelector('.login__input') as formType;
          if (!input) return;
         await chatController.createChat(input.value);
         await chatController.getChats({ offset: 0, limit: 15 });
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}
