import { ChatItem } from '../../components/chatItem/chatItem';
import { ChatsList, ChatsListConnect } from '../../components/chatsList/chaytList';
import { chatController } from '../../controllers/ChatController';
import { Block } from '../../utils/Block';
import { store } from '../../utils/Store';
import { source } from './source';

export class PageChats extends Block {
  constructor() {
    super('div', {});
  }

  async loadChats() {
    await chatController.getChats({ offset: 0, limit: 15 });
  }

  init() {
    this._children.chatList = new ChatsListConnect('div', {
      attr: { class: 'chats__block' },
    });

    this.loadChats().then(() => {});
  }

  render() {
    return this.compile(source, this._props);
  }
}
