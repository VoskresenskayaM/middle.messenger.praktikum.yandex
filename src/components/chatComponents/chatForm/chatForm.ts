import { Block } from '../../../utils/Block';
import { source } from './source';
import { ChatFormButton } from '../chatFormButton/chatFormButton';
import { store } from '../../../utils/Store';

export default class ChatForm extends Block {
  init() {
    this._meta.tagName = 'form';
    this._props.attr = { class: 'chats__search-block' };
    this._children.button = new ChatFormButton({
      attr: {
        class: 'chats__search-button',
        type: 'submit',
      },
      events: {
        click: (event: Event) => {
          event.preventDefault();
          if (store.state.chats.length !== 0) {
            /*
             запрос const arr= chatController.getChats({offset:0,limit:15, title: event.target.value})
               store.set('chats', arr) */
          }
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}
