/* eslint-disable dot-notation */
import sinon from 'sinon';
import { assert } from 'chai';
import {
  describe, it, beforeEach, afterEach,
} from 'mocha';
import { Block } from './Block';
import { Route } from './Route';

describe('Route', () => {
  let block: Block<{}>;
  let route: Route;

  beforeEach(() => {
    block = new Block('div', {});
    route = new Route('/path', Block, '#app');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Соответствует указанному пути', () => {
    assert.isTrue(route.match('/path'));
    assert.isFalse(route.match('/other'));
  });

  it('Не отображает блок, если он уже обработан', () => {
    route['_block'] = block;
    const renderStub = sinon.stub(route, 'render');
    route.render();
    assert.isTrue(renderStub.calledOnce);
  });

  it('Устанавливает блок на null при уходе', () => {
    route['_block'] = block;
    route.leave();
    assert.isNull(route['_block']);
  });
});
