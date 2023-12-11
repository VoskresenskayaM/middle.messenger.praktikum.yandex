import { Block } from '../../utils/Block';
import { StoreState, connect, store } from '../../utils/Store';
import { ChatItem } from '../chatItem/chatItem';

export class ChatsList extends Block {
  init() {
    const { chats } = store.getState();
    this._lists.items = chats.map((el) => new ChatItem({ attr: {}, text: el.title }));
  }

  render() {
    console.log(this._props.chats);
    return this.compile('{{{items}}}', this._props);
  }
}

function mapStateToProps(state: StoreState) { return { chats: state.chats }; }
export const ChatsListConnect = connect(mapStateToProps)(ChatsList);
