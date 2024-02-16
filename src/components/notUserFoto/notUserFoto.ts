import { Block } from '../../utils/Block';
import { StoreState, connect } from '../../utils/Store';
import { source } from './source';

class NotUserFoto extends Block {
  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { avatar: state.user.avatar }; }
export const NotUserFotoConnect = connect(mapStateToProps)(NotUserFoto);
