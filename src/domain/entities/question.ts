import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"


interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: string
}
export class Question extends Entity<QuestionProps> { // envio a tipagem para a classe pai

}