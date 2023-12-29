import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
})
