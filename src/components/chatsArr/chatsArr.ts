import { chatController } from '../../controllers/ChatController';
import { Block } from '../../utils/Block';
import { StoreState, connect, store } from '../../utils/Store';
import { source } from './source';

import { ChatItem } from '../chatItem/chatItem';
import { Chats } from '../../api/ChatApi';

export class ChatsArr extends Block {

 private changeChat = async (id: number) => {
    store.set('activeChatId', id);
     chatController.initChat();
     chatController.getUsersFromChat();
  };

  /*private createChats(chats: Chats[]) {
    return chats.map((el) => new ChatItem('div', {
      attr: {
        class: 'chats__chat',
      },
      ...el,
      events: { click: () => this.changeChat(el.id) },
    }));
  }
  init() {
 
    const { chats } = store.getState();
    this._lists.items = chats.map((el) => new ChatItem('div', {
      attr: {
        class: 'chats__chat',
      },
      ...el,
      events: { click: () => this.changeChat(el.id) },
    }));
  }*/

  /*componentDidUpdate() {
    this._lists.items = this.createChats(this._props.chats);
  }*/

  render() {
    return this.compile('{{{items}}}', this._lists);
  }
}

function mapStateToProps(state: StoreState) { return {chats: state.chats} }
export const ChatsArrConnect = connect(mapStateToProps)(ChatsArr);
