import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answer-repository"
interface AnswerProps {
    content: string
    authorId: string
    questionId: string
}
interface AnswerQuestionUseCaseProps {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {

    constructor(
        private answersRepository: AnswersRepository
    ){}
    async execute({instructorId, questionId, content}: AnswerQuestionUseCaseProps){
        const answer = new Answer({
            authorId: instructorId,
            content, 
            questionId
        })
        await this.answersRepository.create(answer)
        return answer
    }
}

