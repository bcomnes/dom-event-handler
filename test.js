const test = require('tape')
const DOMEventHandler = require('./')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const existy = require('existy')

test('can insatiate and has required API methods', t => {
  class HandlerClass {
    oncustomevent (ev) {
      console.log(ev)
    }
  }
  const ctx = new HandlerClass()
  const handler = new DOMEventHandler(ctx)
  t.equal(typeof handler.addEventListeners, 'function', 'addEventListeners is defined')
  t.equal(typeof handler.removeEventListeners, 'function', 'removeEventListeners is defined')
  t.equal(typeof handler.handleEvent, 'function', 'handleEvent is defined')
  t.true(Array.isArray(handler.events), 'events getter returns an array')
  t.equal(handler.events.length, 1, 'events getter has one event')
  t.throws(() => {
    const handler = new DOMEventHandler()
    console.log(handler.events)
  }, /context is required/, 'missing context throws')
  t.end()
})

test('works even without handlers', t => {
  class HandlerClass {}
  const ctx = new HandlerClass()
  const handler = new DOMEventHandler(ctx)
  t.true(Array.isArray(handler.events), 'events getter returns an array')
  t.equal(handler.events.length, 0, 'events getter has 0 events')
  t.end()
})

test('handles events when instantiated with a node', t => {
  const dom = new JSDOM(`<!DOCTYPE html><p id='node'>Hello world</p>`)
  const node = dom.window.document.querySelector('p')
  const CustomEvent = dom.window.CustomEvent

  class HandlerClass {
    oncustomevent (ev) {
      t.equal(ev.detail.unicorn, 'rainbows', 'handled event')
      t.end()
    }
  }
  const ctx = new HandlerClass()
  const handler = new DOMEventHandler(ctx, node)
  t.true(existy(handler), 'handler created')
  var event = new CustomEvent('customevent', { detail: { unicorn: 'rainbows' } })

  node.dispatchEvent(event)
})

test('handles events when attached after the fact', t => {
  const dom = new JSDOM(`<!DOCTYPE html><p id='node'>Hello world</p>`)
  const node = dom.window.document.querySelector('p')
  const CustomEvent = dom.window.CustomEvent

  class HandlerClass {
    oncustomevent (ev) {
      t.equal(ev.detail.unicorn, 'rainbows', 'handled event')
      t.end()
    }
  }
  const ctx = new HandlerClass()
  const handler = new DOMEventHandler(ctx)
  handler.addEventListeners(node)
  var event = new CustomEvent('customevent', { detail: { unicorn: 'rainbows' } })

  node.dispatchEvent(event)
})

test('doesnt handle events when removed', t => {
  const dom = new JSDOM(`<!DOCTYPE html><p id='node'>Hello world</p>`)
  const node = dom.window.document.querySelector('p')
  const CustomEvent = dom.window.CustomEvent

  class HandlerClass {
    oncustomevent (ev) {
      t.fail('this shouldnt run')
    }
  }
  const ctx = new HandlerClass()
  const handler = new DOMEventHandler(ctx, node)
  t.true(existy(handler), 'handler created')
  var event = new CustomEvent('customevent', { detail: { unicorn: 'rainbows' } })
  handler.removeEventListeners(node)
  node.dispatchEvent(event)
  setTimeout(() => {
    t.ok(true, 'event handler doesnt catch anything')
    t.end(null)
  }, 5)
})
