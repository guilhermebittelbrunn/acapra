import { SignUpDTO } from '@/module/user/useCases/auth/signUp/dto/signUp.dto';
import { PickType } from '@nestjs/swagger';

export class CreateAssociationDTO extends PickType(SignUpDTO, ['email', 'name', 'password'] as const) {}
