import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  oldPassword: Block,
  newPassword: Block,
  newPassword2:Block,
  button: Block
}

export default class userPasswordUpdateForm extends Block {
  constructor(props:Props) {
    super('form', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
