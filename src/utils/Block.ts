import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import FormValidator from './FormValidator';

export class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public _props : Props;

  public _children;

  public _id;

  protected _lists;

  private _element: HTMLElement | null = null;

  protected _meta;

  private _eventBus;

  protected _validator : FormValidator| null = null;

  /* private _setUpdate = false; */

  constructor(tagName: string, propsAndChildren : Props) {
    const { children, props, lists } = this._getChildren(propsAndChildren || {});

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this._makePropsProxy(children);
    this._meta = {
      tagName,
      props,
    };
    this._props = this._makePropsProxy({ ...props, __id: this._id });
    this._lists = this._makePropsProxy(lists);
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {}

  private _init() {
    this.init();
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    /* if (this._props.settings?.whithInteralID) { element.setAttribute('data-id', this._id); } */
    return element;
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  public dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: Props,
    newProps: Props,
  ) {
    /* if (oldProps !== undefined && newProps !== undefined) {
      return;
    } */
    this.componentDidUpdate();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate() {

  }

  public setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }
    const { children, props, lists } = this._getChildren(nextProps);

    if (Object.values(props).length) { Object.assign(this._props, props); }

    if (Object.values(children).length) { Object.assign(this._children, children); }

    if (Object.values(lists).length) { Object.assign(this._lists, lists); }
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (!block) return;
    this._removeEvents();
    if (!this._element) return;
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
    this._addAttribute();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment | null {
    return null;
  }

  private _addEvents() {
    const { events = {} }: { events: Record<string, () => void> | undefined } = this._props as any;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} }: { events: Record<string, () => void> | undefined } = this._props as any;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addAttribute() {
    const { attr = {} }:{ attr: Record<string, string>} = this._props as any;
    Object.entries(attr).forEach(([key, value]) => {
      if (!this._element) return;
      this._element.setAttribute(key, value);
    });
  }

  public getContent() {
    return this._element;
  }

  protected _makePropsProxy(props: Record<string, unknown>): Props {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self._eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as Props;
  }

  _getChildren(propsAndChildren : Props):{ props: Props,
    children: Record<string, Block>, lists : Record<string, Array<Block>>} {
    const children : Record<string, Block> = {};
    const props : Record<string, unknown> = {};
    const lists : Record<string, Array<Block>> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(propsAndChildren[key])) { lists[key] = propsAndChildren[key]; } else {
        props[key] = value;
      }
    });

    return { children, props: props as Props, lists };
  }

  compile(template: string, props: any) {
    /* if (typeof (props) === 'undefined') { props = this._props; } */

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this._lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${key}"></div>`;
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) { stub.replaceWith(child.getContent()); }
    });

    Object.entries(this._lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`);
      if (!stub) return;
      const listContent = document.createElement('template');
      child.forEach((item: { getContent: () => any; }) => {
        const itemEl = item.getContent();
        if (item instanceof Block) { listContent.content.append(itemEl); } else { listContent.content.append(`${item}`); }
      });
      stub.replaceWith(listContent.content);
    });
    return fragment.content;
  }

  public show() {
    const content = this.getContent();
    if (!content) return;
    content.style.display = 'block';
  }

  public hide() {
    const content = this.getContent();
    if (!content) return;
    content.style.display = 'none';
  }

  public validateForm() {}
}
