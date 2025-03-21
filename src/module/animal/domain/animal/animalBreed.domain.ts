import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';

export interface AnimalBreedProps {
  value: string;
}

export default class AnimalBreed extends ValueObject<AnimalBreedProps> {
  private static userFriendlyName = 'Raça';

  get value(): string {
    return this.props.value;
  }

  private constructor(props: AnimalBreedProps) {
    super(props);
  }

  private static format(breed: string): string {
    return breed.trim().toLowerCase();
  }

  public static create(breed: string | null): AnimalBreed | GenericAppError {
    return new AnimalBreed({ value: this.format(breed) });
  }
}
