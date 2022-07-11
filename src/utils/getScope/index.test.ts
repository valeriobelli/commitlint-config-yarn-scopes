import { getScope } from '.'

it('returns the name of the package when it starts with "@"', () => {
  expect(getScope('@fooo/bar')).toBe('bar')
})

it('returns the name of the package when it does not start with "@"', () => {
  expect(getScope('baz')).toBe('baz')
})

