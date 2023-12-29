// Error
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight() {
    return false
  }

  isLeft() {
    return true
  }
}

// Success
export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight() {
    return true
  }

  isLeft() {
    return false
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
