import { QNode } from '../QNode'

test('Construction with default options', () => {
  const q = new QNode('')
  expect(q.options.condenseWhitespace).toBe(true)
  expect(q.options.decodeEntities).toBe(false)
  expect(q.options.indexIds).toBe(true)
  expect(q.options.rootSelector).toBe('body')
})

test('Construction with some options', () => {
  const q = new QNode('', { indexIds: false })
  expect(q.options.condenseWhitespace).toBe(true)
  expect(q.options.decodeEntities).toBe(false)
  expect(q.options.indexIds).toBe(false)
  expect(q.options.rootSelector).toBe('body')
})

test('Construction with all options set', () => {
  const q = new QNode('', {
    condenseWhitespace: false,
    decodeEntities: true,
    indexIds: false,
    rootSelector: '.test:nth-child(4)'
  })
  expect(q.options.condenseWhitespace).toBe(false)
  expect(q.options.decodeEntities).toBe(true)
  expect(q.options.indexIds).toBe(false)
  expect(q.options.rootSelector).toBe('.test:nth-child(4)')
})
