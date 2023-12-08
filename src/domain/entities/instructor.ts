import { Entity } from "../../core/entities/entity"

interface InstructorProps {
    name: string
}
export class Instructor extends Entity<InstructorProps> { //envio da tipagem para a classe pai
}