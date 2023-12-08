import { Entity } from "../../core/entities/entity"

interface AnswerProps {
    content: string
    authorId: string
    questionId: string
}
export class Answer extends Entity<AnswerProps> { // envio da tipagem para a classe pai
    get content(){
        return this.props.content
    }
}