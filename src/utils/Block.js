/*import handlebars from 'vite-plugin-handlebars';*/
import EventBus from './EventBus'
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  };

  _props;
  _children;
  _id;
  _element;
  _meta;
  _eventBus;
  _setUpdate = false;

  constructor(tagName, propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = children;
    this._meta = {
      tagName,
      props
    };
    this._props = this._makePropsProxy({ ...props, __id: this._id });
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /*_init() {
    this.init();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }*/
  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    if (this._props.settings?.whithInteralID)
      element.setAttribute('data-id', this._id)
    return element;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return oldProps !== undefined && newProps !== undefined;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._removeEvents();
    this.addAttribute();
  }

  // Может переопределять пользователь, необязательно трогать
  render() { }

  _addEvents() {
    const { events = {} } = this._props;
    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this._props;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttribute(){
    const {attr={}} =this._props;
    Object.entries(attr).forEach(([key, value])=>{
      this._element.setAttribute(key, value)
    })
  }

  getContent() {
    return this._element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    })
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }


  compile(template, props) {
    if(typeof(props)==='undefined')
    props=this._props
   
    const propsAndStubs = { ...props };
    console.log(propsAndStubs)
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
     if(stub)
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}