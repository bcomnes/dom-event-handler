# dom-event-handler

[![Greenkeeper badge](https://badges.greenkeeper.io/bcomnes/dom-event-handler.svg)](https://greenkeeper.io/)

[![npm version][npmimg]][npm] [![build status][travisimg]][travis] [![coverage][coverallsimg]][coveralls]
[![downloads][downloadsimg]][downloads] [![js-standard-style][standardimg]][standard]

A generic DOM event handler.  Inspired by a @webreflection [article](https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38).

## Installation
```console
$ npm install dom-event-handler
```

## Usage

```js
import DOMEventHandler from "dom-event-handler"

class MyWSController extends SomeOtherClass {
  constructor () {
    this.ws = new WebSocket('ws://localhost:8080')
    this.handler = new DOMEventHandler(this, this.ws)
  }

  // These methods handle the websocket events
  onmessage (ev) {}
  onopen (ev) {}
  onerror (ev) {}
  onclose (ev) {}
}
```

Isn't that nicer than this?

```js
const ws = new WebSocket('ws://localhost:8080')

class VerboseWSController {
  constructor () {
    this.foo = 'bar'

    // You have to bind since you don't pass a full context.
    // Static class properties assigned to arrow functions are less verbose
    // but are structurally similar to binding, and have poor env support still.
    // They don't reside on the prototype.  That may or may not matter to the use case.
    this.onmessage = this.onmessage.bind(this)
    this.onopen = this.onopen.bind(this)s
    this.onerror = this.onerror.bind(this)
    this.onclose = this.onclose.bind(this)
  }

  onmessage (ev) {}
  onopen (ev) {}
  onerror (ev) {}
  onclose (ev) {}
}

const c = new VerboseWSController()

ws.addEventListener('message', c.onmessage)
ws.addEventListener('open', c.onopen)
ws.addEventListener('error', c.onerror)
ws.addEventListener('close', c.onclose)
```

## API

### `handler = new DOMEventHandler(ctx, [node])`

Create a new instance of `DOMEventHandler` passing in a context `ctx` (often `this` when created within a class) and optionally a [DOM event target][domtarget] `node` (e.g. an event emitting DOM node) to attach listeners to on instantiation.

The `ctx` should be an object who's prototype contains event handler methods.  Event handler methods must take the form of `on{eventname}` where `eventname` is the name of the event you want to listen on and handle (the name you would pass to `node.addEventListener`).  In practice, you can pass a class instance as a `ctx`, or `this` when the instance owns the `DOMEventHanlder` instance.

### `handler.addEventListeners(node)`

Attach all `event` handler methods on `ctx` to the [DOM event target][domtarget] `node`.

### `handler.removeEventListeners(node)`

Remove all `event` handler event names on `ctx` from the [DOM event target][domtarget] `node`.

### Internal Methods

You don't need to call these, but they are there.

#### `handler.handleEvent(event)`

Implements the [`eventListener.handleEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent) method for the  `events` found on the `ctx` prototype.  This is where the magic happens.

#### `handler.events`

A getter that returns all events found on the `ctx` the handler is bound to.  The events returned from this getter are what get attached and detached in the above methods.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[stabilityimg]: https://img.shields.io/badge/stability-experimental-orange.svg
[stability]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npmimg]: https://img.shields.io/npm/v/dom-event-handler.svg
[npm]: https://npmjs.org/package/dom-event-handler
[travisimg]: https://img.shields.io/travis/bcomnes/dom-event-handler/master.svg
[travis]: https://travis-ci.org/bcomnes/dom-event-handler
[downloadsimg]: http://img.shields.io/npm/dm/dom-event-handler.svg
[downloads]: https://npmjs.org/package/dom-event-handler
[standardimg]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard]: https://github.com/feross/standard
[coverallsimg]: https://img.shields.io/coveralls/bcomnes/dom-event-handler/master.svg
[coveralls]: https://coveralls.io/github/bcomnes/dom-event-handler


[domtarget]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
