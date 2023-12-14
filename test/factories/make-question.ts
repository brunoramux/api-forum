import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  // Partial faz com que as propriedades, caso as QuestionProps, sejam opcionais. Podemos escolher passa-las ou nao
  const question = Question.create({
    authorId: new UniqueEntityId(),
    content: 'Example Question',
    title: 'Example title',
    slug: Slug.createFormText('Example Title'),
    ...override, // as informacoes que forem passadas via parametro para a funcao makeQuestion serao usadas por cima das informacoes acima.
  })

  return question
}
