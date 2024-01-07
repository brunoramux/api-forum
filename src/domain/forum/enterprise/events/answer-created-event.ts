import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
