import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  inputLogin: Block,
inputPassword: Block,
button : Block,
}
export default class RegForm extends Block {
  constructor(props: Props) {
    super('form', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
