import { Block } from '../../utils/Block';
import { source } from './source';
import { StoreState, connect } from '../../utils/Store';

class UserName extends Block {
  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { name: state.user.first_name }; }

export const UserNameConnect = connect(mapStateToProps)(UserName);
