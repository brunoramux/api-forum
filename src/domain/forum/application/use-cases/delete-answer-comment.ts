import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Question Comment not Found')
    }

    if (answerComment?.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
