import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not Found')
    }

    if (question?.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
