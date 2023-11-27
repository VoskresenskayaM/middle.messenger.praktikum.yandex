import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  userFoto: Block,
  userName?: Block,
  userForm: Block,
  backPanel:Block
}
export default class UserUpdate extends Block {
  constructor(props:Props) {
    super('main', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
