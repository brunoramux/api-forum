import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('It should be able to update a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      content: 'content-2',
      questionId: newQuestion.id.toValue(),
      title: 'question-2',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'question-2',
      content: 'content-2',
    })
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
        await sut.execute({
          authorId: 'author-2',
          content: 'content-2',
          questionId: newQuestion.id.toValue(),
          title: 'question-2',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
