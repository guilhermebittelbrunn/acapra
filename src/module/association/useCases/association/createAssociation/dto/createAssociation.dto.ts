import { PickType } from '@nestjs/swagger';

import { SignUpDTO } from '@/module/user/useCases/auth/signUp/dto/signUp.dto';

export class CreateAssociationDTO extends PickType(SignUpDTO, ['email', 'name', 'password'] as const) {}
