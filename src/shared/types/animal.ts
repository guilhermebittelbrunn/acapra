export enum AnimalStatusEnum {
  AVAILABLE = 'available',
  IN_ADOPTION = 'in_adoption',
  ADOPTED = 'adopted',
}

export enum AnimalGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum SpecieBaseTypeEnum {
  DOG = 'dog',
  CAT = 'cat',
  BIRD = 'bird',
  RODENT = 'rodent', // -- Roedor (ex: hamster, coelho)
  REPTILE = 'reptile',
  FISH = 'fish',
  FARM = 'farm', // -- Animal de fazenda (ex: cavalo, cabra)
  EXOTIC = 'exotic', // -- Animal exótico (ex: furão, cobra)
  OTHER = 'other',
}
