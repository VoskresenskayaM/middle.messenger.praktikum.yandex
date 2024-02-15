import { Chats } from '../../../api/ChatApi';
import { chatController } from '../../../controllers/ChatController';
import { Block } from '../../../utils/Block';
import { StoreState, connect, store } from '../../../utils/Store';
import { Props } from '../../../utils/Types';
import { ChatItem } from '../chatItem/chatItem';

export class ChatsList extends Block {
  private async chooseChat(id: number) {
    store.set('activeChatId', id);
    await chatController.initChat();
    await chatController.getUsersFromChat();
    if (store.getState().chatUsers.length === 0) {
      await chatController.addUserInChat({ users: [this._props.user], chatId: id });
    }
  }

  init() {
    this._lists.items = this._lists.chats.map((el : Chats) => new ChatItem('div', {
      attr: {
        class: 'chats__chat',
      },
      ...el,
      events: { click: () => this.chooseChat(el.id) },
    }));
  }

  public setProps(nextProps: Props) {
    if ('chats' in nextProps) {
      // eslint-disable-next-line no-param-reassign
      nextProps.items = nextProps.chats.map((el : Chats) => new ChatItem('div', {
        attr: {
          class: 'chats__chat',
        },
        ...el,
        events: { click: () => this.chooseChat(el.id) },
      }));
    }
    super.setProps(nextProps);
  }

  render() {
    return this.compile('{{{items}}}', this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    chats: state.chats,
    user: state.user,
  };
}
export const ChatsListConnect = connect(mapStateToProps)(ChatsList);
