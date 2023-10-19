import { randomUUID } from "node:crypto"

interface AnswerProps {
    content: string
    authorId: string
    questionId: string
}
export class Answer {
    public content: string
    public id: string
    public authorId: string
    public questionId: string

    constructor({ authorId, content, questionId}: AnswerProps, id?: string){
        this.content = content
        this.id = id ?? randomUUID()
        this.authorId = authorId
        this.questionId = questionId
    }
}