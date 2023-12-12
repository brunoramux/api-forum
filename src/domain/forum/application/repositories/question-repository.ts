import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  create(answer: Question): Promise<Question>
}
