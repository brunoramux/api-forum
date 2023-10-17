import { randomUUID } from "node:crypto"

export class Instructor {
    public nome: string
    public id: string

    constructor(nome: string, id?: string){
        this.nome = nome
        this.id = id ?? randomUUID()
    }
}