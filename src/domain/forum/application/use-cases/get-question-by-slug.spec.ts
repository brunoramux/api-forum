import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let questionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    questionBySlug = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('It should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.createFromText('Example Bruno'), // setando uma das propriedades. As demais ficara padrao
    })
    await inMemoryQuestionRepository.create(newQuestion)

    const result = await questionBySlug.execute({ slug: 'example-bruno' })
    expect(result.value?.question).toBeTruthy()
  })
})
