// @flow

import persistCombineReducers from '../src/persistCombineReducers'
import { createMemoryStorage } from 'storage-memory'

import test from 'ava'

const config = {
  key: 'TestConfig',
  storage: createMemoryStorage(),
}

test('persistCombineReducers returns a function', t => {
  let reducer = persistCombineReducers(config, {
    foo: () => 'foo string'
  })
  t.is(typeof reducer, 'function')
  t.is(reducer({},{}).foo, 'foo string')
})

test('persistCombineReducers returns a function', t => {
  let reducer = persistCombineReducers(config, {
    foo: () => 'foo string',
  })
  t.is(typeof reducer, 'function')
  t.is(reducer({},{}).foo, 'foo string')
})

test('persistCombineReducers combines two reducers', t => {
  let reducer = persistCombineReducers(config, {
    foo: () => 'foo string',
    bar: () => 'bar string',
  })
  t.is(reducer({},{}).foo, 'foo string')
  t.is(reducer({},{}).bar, 'bar string')
})

test.skip('persistCombineReducers merges two levels deep of state', t => {
  
})

test('persistCombineReducers uses custom combineReducers config', t => {
  const customConfig = {
    key: 'TestConfig',
    storage: createMemoryStorage(),
    combineReducers: () => (State, Action) => 'Custom Combined'
  }
  let reducer = persistCombineReducers(customConfig, {
    foo: () => ({})
  })
  t.is(reducer({},{}), 'Custom Combined')
})
