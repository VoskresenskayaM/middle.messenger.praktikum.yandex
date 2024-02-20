/* eslint-disable @typescript-eslint/no-unused-vars */
// const {JSDOM} = require('jsdom')
import { JSDOM } from 'jsdom';
/* import * as Components from './src/components'; */

/* Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component),
); */

// jsdom
const jsdom = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.DocumentFragment = window.DocumentFragment;
global.history = window.history;
