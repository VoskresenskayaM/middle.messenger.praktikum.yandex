import { Block } from '../utils/Block';
import { render } from '../utils/renderDOM';

function isEqual(lhs : string, rhs: string): boolean {
  return lhs === rhs;
}
export interface BlockConstructable<P extends object = any> {
  new (props: P): Block<P>;
}

export class Route {
  private _pathname : string;

  private _props: string;

  private _block : Block | null = null;

  public _blockClass: typeof Block;

  constructor(pathname : string, blockClass: typeof Block, props: string) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._props = props;
  }

  /* navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  } */

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      // @ts-expect-error
      this._block = new this._blockClass({});
      render(this._props, this._block);
    }
  }
}
