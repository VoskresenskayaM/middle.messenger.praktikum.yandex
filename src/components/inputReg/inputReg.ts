import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  label: string,
  type: string,
  inputName: string,
  reg: string,
  error: string,
}

export default class InputReg extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
