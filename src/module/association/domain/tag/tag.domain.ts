import { TagModel } from '@prisma/client';

import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard from '@/shared/core/logic/guard';
import { PartialAutoGenerated } from '@/shared/types/common';

interface ITagProps extends PartialAutoGenerated<Pick<TagModel, 'name'>> {
  associationId?: UniqueEntityID;
}

export default class Tag extends Entity<ITagProps> {
  constructor(props: ITagProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get associationId(): UniqueEntityID | null | undefined {
    return this.props.associationId;
  }

  get enabled(): boolean {
    return this.props.enabled;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deleted(): boolean {
    return this.props.deleted;
  }

  public static create(props: ITagProps, id?: UniqueEntityID): Tag | GenericAppError {
    const guardedProps = Guard.againstNullOrUndefinedBulk([
      { argument: props.associationId, argumentName: 'id da associação' },
    ]);

    if (!guardedProps.succeeded) {
      return new GenericErrors.InvalidParam(guardedProps.message);
    }

    const propsWithDefault = {
      enabled: true,
      ...props,
    };

    return new Tag(propsWithDefault, id);
  }
}
