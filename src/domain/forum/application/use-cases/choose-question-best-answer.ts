import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answer-repository'
import { QuestionRepository } from '../repositories/question-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer Not Fount')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question Not Fount')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
