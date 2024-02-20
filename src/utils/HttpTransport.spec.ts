import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import {
  describe, it, beforeEach, afterEach,
} from 'mocha';

import { HTTPTransport } from './HttpTransport';
import { BASE_URL } from './Constants';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;

  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('Метод get() вызывается с GET методом', () => {
    instance.get('/');

    const [request] = requests;

    expect(request.method).to.equal('GET');
  });

  it('Метод post() вызывается с POST методом', () => {
    instance.post('/');

    const [request] = requests;

    expect(request.method).to.equal('POST');
  });

  it('метод get вставялет url параметры в с запрос', () => {
    const queryParams = {
      param1: 'param1',
      param2: 'param2',
    };

    instance.get('/', { data: queryParams });

    const [request] = requests;
    const paramsUrl = `${BASE_URL}/?param1=param1&param2=param2`;

    expect(request.url).to.equal(paramsUrl);
  });

  it('Метод get вставляет headers в запрос', () => {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer token',
    };

    instance.get('/', {
      // @ts-expect-error
      headers,
    });

    const [request] = requests;

    expect(request.requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8');
    expect(request.requestHeaders.Authorization).to.equal('Bearer token');
  });

  it('Метод put() вызывается с put методом', () => {
    instance.put('/');

    const [request] = requests;

    expect(request.method).to.equal('PUT');
  });

  it('Метод delete() вызывается с delete методом', () => {
    instance.delete('/');

    const [request] = requests;

    expect(request.method).to.equal('DELETE');
  });
});
