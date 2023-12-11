import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answer-repository"

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
        const answer = Answer.create({
            content,
            questionId: new UniqueEntityId(questionId),
            authorId: new UniqueEntityId(instructorId)
        })
        await this.answersRepository.create(answer)
        return answer
    }
}

