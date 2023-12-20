import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('It should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({ questionId: 'question-1', authorId: 'author-1' })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('It should not be able to delete a question from other authors', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionRepository.create(newQuestion)

    expect(
      async () =>
        await sut.execute({ questionId: 'question-1', authorId: 'author-2' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
