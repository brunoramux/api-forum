import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}
interface FetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    if (!questions) {
      throw new Error('No questions found!')
    }

    return {
      questions,
    }
  }
}
