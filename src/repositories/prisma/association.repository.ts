import { Injectable } from '@nestjs/common';
import { AssociationModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import { IAssociationRepository } from '../association.repository.interface';
import { Association } from '@/module/association/domain/association.domain';
import AssociationMapper from '@/module/association/mappers/association.mapper';

@Injectable()
export class AssociationRepository
  extends BaseRepository<'associationModel', Association, AssociationModel>
  implements IAssociationRepository
{
  mapper = AssociationMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('associationModel', prisma, als);
  }
}
