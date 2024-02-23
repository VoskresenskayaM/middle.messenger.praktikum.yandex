// eslint-disable-next-line max-classes-per-file
import { expect, assert } from 'chai';
import { describe, it, before } from 'mocha';
import sinon from 'sinon';
import { Block } from './Block';
import { router } from './Router';

const eventBusMock = {
  emit: sinon.fake(),
};

describe('Router', () => {
  let mainPage: typeof Block;
  let testPage: typeof Block;

  before(() => {
    class MainTestPage extends Block {
      constructor() {
        super('main', { text: 'text' });
      }

      dispatchComponentDidMount = sinon.fake.returns(eventBusMock.emit(Block.EVENTS.FLOW_CDU));

      render() {
        return this.compile('<p id="mainPage">{{text}}</p>', this._props);
      }
    }

    class TestPage {
      getContent() {
        const div = document.createElement('div');

        div.setAttribute('id', 'test');

        return div;
      }
    }

    mainPage = MainTestPage as unknown as typeof Block;
    testPage = TestPage as unknown as typeof Block;
  });

  it('Возвращает экземпляр роутера при использовании', () => {
    const instance = router.use('/maintestpage', mainPage);
    expect(instance).to.eq(router);
  });

  it('Отображает страницу при запуске', () => {
    router.use('/', mainPage).start();
    expect(eventBusMock.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.eq(true);
  });

  it('Переход по роуту происходит успешно', () => {
    router
      .use('/maintestpage', mainPage)
      .use('/testpage', testPage)
      .start();
    router.go('/testpage');
    assert.strictEqual(window.location.pathname, '/testpage');
  });
});
