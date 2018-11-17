# dom-event-handler
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

## API

### `handler = new DOMEventHandler(ctx, [node])`

Create a new instance of DOMEventHandler passing in a context `ctx` (often `this`) and optionally an event emitter `node` (e.g. an event emitting DOM node) to attach listeners to.

### `handler.addEventListeners(node)`

Attach all `event` handler methods on `ctx` to the event emitter `node`.

### `handler.removeEventListeners(node)`

Remove all `event` handler event names on `ctx` from the event emitter `node`.

### Internal Methods

You don't need to call these, but they are there.

#### `handler.handleEvent(event)`

Implements the [`eventListener.handleEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent) method for the  `events` found on the `ctx` prototype.  This is where the magic happens.

#### `handler.events`

A getter that returns all events found on the `ctx` the handler is bound to.  A handler is a method on `ctx` prototype that starts with the letters `on`.


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
