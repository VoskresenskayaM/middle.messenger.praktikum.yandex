import ChatForm from '../../components/chatComponents/chatForm/chatForm';
import ChatLink from '../../components/chatComponents/chatLink/chatLink';
import { Block } from '../../utils/Block';
import { ROUTES } from '../../utils/Constants';
import { router } from '../../utils/Router';
import { source } from './source';
import { ChatsListConnect } from '../../components/chatComponents/chatsArr/chatsArr';
import { chatController } from '../../controllers/ChatController';
import { StoreState, connect, store } from '../../utils/Store';
import { AddChatForm } from '../../components/chatComponents/addChatForm/addChatForm';
import { ChatHeaderConnect } from '../../components/chatComponents/chatHeader/chatHeader';
import { AddUserFormConnect } from '../../components/chatComponents/addUserForm/addUserForm';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import ChatSendForm from '../../components/chatComponents/chatSendForm/chatSendForm';
import { formType } from '../../utils/Types';
import { ChatMessagesListConnect } from '../../components/chatComponents/chatMessagesList/chatMessagesList';

export class PageChat extends Block {
  async loadChats() {
    await chatController.getChats({ offset: 0, limit: 15 });
  }

  init() {
    this._meta.tagName = 'main';
    this._props.attr = { class: 'chat' };
    this._children.profileLink = new ChatLink({
      attr: { class: 'chats__profile-link-block' },
      events: {
        click: (event: Event) => {
          if (event.target) router.go(ROUTES.PROFILE);
        },
      },
    });

    this._children.chatForm = new ChatForm('form', {});

    this._children.chatList = new ChatsListConnect('div', {
      attr: { class: 'chats__block' },
    });
    this._children.addChatForm = new AddChatForm('form', {});
    this._children.chatSendForm = new ChatSendForm({
      attr: {
        class: 'feed__form',
      },
      events: {
        submit: async (event : Event) => {
          event.preventDefault();
          const form = document.querySelector('.feed__form') as formType;
          if (!form) return;
          const input = form.querySelector('.feed__form-input') as formType;
          if (!input) return;
          this._props.socket?.sendMessage(input.value);
          form.reset();
        },
      },

    });
    this._children.addUserForm = new AddUserFormConnect('form', {
      attr: { class: 'login__form-add-user' },
    });
    this._children.button = new ButtonTest({
      text: 'Удалить чат',
      attr: {
        class: 'user__form-button',
        type: 'submit',
      },
      events: {
        click: async (event : Event) => {
          event.preventDefault();
          const { activeChatId } = store.getState();
          const data = { chatId: activeChatId };
          await chatController.deleteChat(data);
        },
      },
    });

    this._children.chatHeader = new ChatHeaderConnect('div', { attr: { class: 'feed__contact' } });
    this._children.messagesList = new ChatMessagesListConnect('div', { attr: { class: 'feed__all-messages' } });
    this.loadChats().then(() => {});
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeChatId: state.activeChatId,
    messages: state.messages,
    socket: state.socket,
  };
}
export const PageChatConnect = connect(mapStateToProps)(PageChat);
