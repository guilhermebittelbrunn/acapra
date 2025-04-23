import Picture from './picture.domain';

import Aggregate from '@/shared/core/domain/Aggregate';

export default class Pictures extends Aggregate<Picture> {
  private constructor(initialItems?: Array<Picture>) {
    super(initialItems);
  }

  compareItems(a: Picture, b: Picture): boolean {
    return a.equals(b);
  }

  public static create(initialItems?: Array<Picture>): Pictures {
    return new Pictures(initialItems);
  }
}
