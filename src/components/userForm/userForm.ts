import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  emailInput:Block,
  loginInput:Block,
  firstNameInput:Block,
  secondNameInput:Block,
  displayInput:Block,
  phoneInput:Block,
  button?:Block,
  isUdate: boolean
}

export default class UserForm extends Block {
  constructor(props:Props) {
    super('form', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
