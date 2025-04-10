import { WishListModel } from '@prisma/client';

import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard from '@/shared/core/logic/guard';
import { PartialAutoGenerated } from '@/shared/types/common';

interface IWishListProps extends PartialAutoGenerated<Omit<WishListModel, 'userId' | 'animalId'>> {
  animalId?: UniqueEntityID;
  userId?: UniqueEntityID;
}

export default class WishList extends Entity<IWishListProps> {
  constructor(props: IWishListProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get animalId(): UniqueEntityID | null | undefined {
    return this.props.animalId;
  }

  get userId(): UniqueEntityID | null | undefined {
    return this.props.userId;
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

  public static create(props: IWishListProps, id?: UniqueEntityID): WishList | GenericAppError {
    const guardedProps = Guard.againstNullOrUndefinedBulk([
      { argument: props.animalId, argumentName: 'id do animal' },
      { argument: props.userId, argumentName: 'id do usuário' },
    ]);

    if (!guardedProps.succeeded) {
      return new GenericErrors.InvalidParam(guardedProps.message);
    }

    return new WishList(props, id);
  }
}
