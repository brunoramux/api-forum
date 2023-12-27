import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not Found')
    }

    if (question?.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
