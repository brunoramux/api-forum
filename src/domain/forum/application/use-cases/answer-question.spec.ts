import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeAll(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to Answer a question', async () => {
    const result = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswersRepository.items[0].attachaments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryAnswersRepository.items[0].attachaments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
