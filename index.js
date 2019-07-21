// https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
class DOMEventHandler {
  constructor (ctx, node) {
    if (!ctx) throw new Error('DOMEventHandler: A context is required.')
    this.ctx = ctx
    if (node) this.addEventListeners(node)
  };

  get events () {
    return (
      this._events ||
      Object.defineProperty(this, '_events', {
        value: Object.getOwnPropertyNames(this.ctx.constructor.prototype)
          .filter(type => /^on/.test(type))
          .map(type => type.slice(2))
      })._events
    )
  };

  handleEvent (event) { this.ctx['on' + event.type](event) }

  addEventListeners (node) { for (let events = this.events, i = events.length; i--; node.addEventListener(events[i], this)); }

  removeEventListeners (node) { for (let events = this.events, i = events.length; i--; node.removeEventListener(events[i], this)); }
}

module.exports = DOMEventHandler
