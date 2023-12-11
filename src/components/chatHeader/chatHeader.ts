import { Block } from '../../utils/Block';
import { source } from './source';
import { StoreState, connect, store } from '../../utils/Store';

export class ChatHeader extends Block {
  /* init() {
    this._props.avatar = this._props.user.avatar;
    this._props.name = this._props.user.first_name;
  } */

  render() {
    return this.compile(source, this._props);
  }
}
function mapStateToProps(state: StoreState) {
  return {
    avatar: state.user.avatar,
    name: state.user.first_name,
  };
}
export const ChatHeaderConnect = connect(mapStateToProps)(ChatHeader);
