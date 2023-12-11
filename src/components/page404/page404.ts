import { Block } from '../../utils/Block';
import { source } from './source';

interface PropsPage404 {
  attr: Record<string, string>,
  error: string,
  message: string,
  link: string
}

export class Page404 extends Block<PropsPage404> {
  constructor(props: PropsPage404) {
    super('name', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
