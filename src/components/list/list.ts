import { Block } from '../../utils/Block';

  interface Props {
    attr: Record<string, string>,
    links: Block[]
  }

export default class List extends Block {
  constructor(props: Props) {
    super('ul', props);
  }

  render() {
    return this.compile('{{{links}}}', this._props);
  }
}
