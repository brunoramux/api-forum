import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Question', () => {
  beforeEach(async () => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('It should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({ answerId: 'answer-1', authorId: 'author-1' })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('It should not be able to delete a question from other authors', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({ answerId: 'question-1', authorId: 'author-2' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
