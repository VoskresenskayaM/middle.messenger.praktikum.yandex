import ChatForm from '../../components/chatForm/chatForm';
import ChatLink from '../../components/chatLink/chatLink';
import { Block } from '../../utils/Block';
import { ROUTES } from '../../utils/Constants';
import { router } from '../../utils/Router';
import { source } from './source';
import { ChatsListConnect } from '../../components/chatsArr/chatsArr';
import { chatController } from '../../controllers/ChatController';
import { StoreState, connect } from '../../utils/Store';
import { AddChatForm } from '../../components/addChatForm/addChatForm';
import { ChatHeader } from '../../components/chatHeader/chatHeader';

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
    this._children.chatList = new ChatsListConnect('div', { attr: { class: 'chats__block' } });
    this._children.addChatForm = new AddChatForm('form', {});
    this._children.chatHeader = new ChatHeader('div', { attr: { class: 'feed__contact' } });
    this.loadChats().then(() => {});
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeChatId: state.activeChatId,
    user: state.user,
  };
}
export const PageChatConnect = connect(mapStateToProps)(PageChat);
