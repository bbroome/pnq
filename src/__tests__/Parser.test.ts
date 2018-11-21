import Parse from '../Parser'

test('Parsing the empty string', () => {
  const q = Parse('')
  expect(q.name).toBe('body')
  expect(q.text).toBe('')
  expect(q.children).toBe([])
})

test('Construction with some options', () => {
  const q = Parse('  ', { condenseWhitespace: false })
  expect(q.name).toBe('body')
  expect(q.text).toBe('  ')
  expect(q.children).toBe([])
})
