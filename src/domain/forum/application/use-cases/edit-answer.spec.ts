import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(async () => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('It should be able to update a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'content-2',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'content-2',
    })
  })

  it('It should not be able to update a answer from other authors', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          content: 'content-2',
          answerId: newAnswer.id.toValue(),
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
