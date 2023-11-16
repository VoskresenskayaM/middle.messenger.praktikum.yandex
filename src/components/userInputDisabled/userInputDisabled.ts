import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  inputName: string,
  inputClass: string,
  inputValue: string
}

export default class UserInputDisabled extends Block {
  constructor(props:Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
