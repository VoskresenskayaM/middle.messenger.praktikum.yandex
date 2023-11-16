import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  inputName: string,
  inputClass: string,
  inputValue?:string,
  reg: string,
  type: string,
  error: string
}

export default class UserInput extends Block {
  constructor(props:Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
