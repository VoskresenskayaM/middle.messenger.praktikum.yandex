import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  backPanel: Block,
  userFoto: Block,
  userForm: Block,
  button: Block
}

export default class UserPasswordUpdate extends Block {
  constructor(props: Props) {
    super('section', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
