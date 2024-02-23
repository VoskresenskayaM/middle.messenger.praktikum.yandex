/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { Block } from './Block';

interface Props {
    text?: string;
    events?: { click?: () => void; };
}

describe('Block', () => {
  let PageClass: typeof Block<Props>;
  before(() => {
    class Page extends Block<Props> {
      constructor(tagName: string, props:Props) {
        super(tagName, {
          ...props,
        });
      }

      getContent() {
        const div = document.createElement(this._meta.tagName);

        div.setAttribute('id', 'block');

        if (this._props.text) {
          div.append(this._props.text);
        }

        return div;
      }
    }
    PageClass = Page;
  });

  it('Компонент создается с состоянием из конструктора', () => {
    const text = 'Hello';
    const pageComponent = new PageClass('div', { text });
    expect(pageComponent.getContent()?.outerHTML).equal('<div id="block">Hello</div>');
  });

  it('Pеактивное повeдение', () => {
    const text = 'new value';
    const pageComponent = new PageClass('div', { text: 'Hello' });

    pageComponent.setProps({ text });
    expect(pageComponent.getContent()?.outerHTML).equal('<div id="block">new value</div>');
  });

  it('Установка события на элемент', () => {
    const pageComponent = new PageClass('button', {
      text: 'text',
      events: {
        /* eslint-disable-next-line no-console */
        click: () => { console.log('Hello'); },
      },
    });
    expect(pageComponent._props.events?.click instanceof Function).to.be.true;
  });
});
