import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let createQuestion: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('It should be able to create a Question', async () => {
    const { question } = await createQuestion.execute({
      authorId: '1',
      content: 'Nova questao',
      title: 'Novo Titulo',
    })

    expect(question.content).toEqual('Nova questao')
    expect(question.id).toBeTruthy()
  })
})
