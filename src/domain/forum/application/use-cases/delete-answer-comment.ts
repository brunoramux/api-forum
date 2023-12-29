/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Question Comment not Found')
    }

    if (answerComment?.authorId.toString() !== authorId) {
      return left('Not Allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
