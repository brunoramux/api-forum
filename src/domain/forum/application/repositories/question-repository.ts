import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<Question>
  delete(question: Question): Promise<void>
}
