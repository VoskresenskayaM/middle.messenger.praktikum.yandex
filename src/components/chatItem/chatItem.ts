import { Block } from '../../utils/Block';
import { source } from './source';
import { Chats } from '../../api/ChatApi';
import { StoreState, connect } from '../../utils/Store';

/* type Props = {
  attr: Record<string, string>,
  chats: Chats
  avatar?: string,
  first_name?: string,
  last_message?: string,
  unread_count?: string,
} */
interface Props {
  attr: Record <string, string>
  text: string }

export class ChatItem extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}

/* function mapStateToProps(state: StoreState) { return { chats: state.chats }; }
export const ChatItemConnect = connect(mapStateToProps)(ChatItem); */
