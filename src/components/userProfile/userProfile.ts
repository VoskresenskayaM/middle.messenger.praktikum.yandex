import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  backPanel:Block,
  userFoto: Block,
  userName: Block,
  userForm: Block
}

export default class UserProfile extends Block {
  constructor(props: Props) {
    super('main', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
