import { Block } from '../../utils/Block';
import { StoreState, connect } from '../../utils/Store';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
}

 class NotUserFoto extends Block {
  /*constructor(tagName: string, props: Props) {
    super('div', props);
  }*/

  

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) { return { avatar: state.user.avatar }; }

export const NotUserFotoConnect = connect(mapStateToProps)(NotUserFoto);
