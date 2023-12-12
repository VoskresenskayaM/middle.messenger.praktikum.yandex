import { Chats } from '../../api/ChatApi';
import { Block } from '../../utils/Block';
import { StoreState, connect, store } from '../../utils/Store';

import { ChatItem } from '../chatItem/chatItem';

type Props ={
  attr: Record<string, string>,
  items: Block[],
  chats: Chats[]

}
export class ChatsList extends Block {
  init() {
    this._lists.items = this._lists.chats.map((el : Chats) => new ChatItem({ attr: {}, text: el.title }));
  }

  public setProps(nextProps: Props) {
    if ('chats' in nextProps) {
      // eslint-disable-next-line no-param-reassign
      nextProps.items = nextProps.chats.map((el : Chats) => new ChatItem({ attr: {}, text: el.title }));
    }
    super.setProps(nextProps);
  }

  render() {
    return this.compile('{{{items}}}', this._props);
  }
}

function mapStateToProps(state: StoreState) { return { chats: state.chats }; }
export const ChatsListConnect = connect(mapStateToProps)(ChatsList);
