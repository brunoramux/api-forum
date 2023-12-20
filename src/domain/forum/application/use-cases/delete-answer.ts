import { AnswersRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not Found')
    }

    if (answer?.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
