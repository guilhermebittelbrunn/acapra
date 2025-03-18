import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class TransactionManagerService {
  constructor(
    private readonly als: Als,
    private readonly prisma: PrismaService,
  ) {}

  run<T = any>(cb: () => T | Promise<T>) {
    return this.prisma.$transaction(async (tx) => {
      this.als.enterWith({
        ...this.als.getStore(),
        tx,
      });

      return cb();
    });
  }
}
