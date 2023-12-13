import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let createQuestion: CreateQuestionUseCase
let questionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionRepository)
    await createQuestion.execute({
      authorId: '1',
      content: 'Nova questao',
      title: 'Novo Titulo',
    })
  })

  it('It should be able to get a question by slug', async () => {
    questionBySlug = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    const { question } = await questionBySlug.execute({ slug: 'novo-titulo' })
    expect(question.id).toBeTruthy()
  })
})
