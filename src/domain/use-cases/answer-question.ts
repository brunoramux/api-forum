import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseProps {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {
    execute({instructorId, questionId, content}: AnswerQuestionUseCaseProps){
        const answer = new Answer(content)
        return answer
    }
}

new AnswerQuestionUseCase().execute({
    instructorId: '1',
    questionId: '1',
    content: 'Ola'

})