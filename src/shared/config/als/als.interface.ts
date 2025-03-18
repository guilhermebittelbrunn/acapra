import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { AsyncLocalStorage } from 'async_hooks';

export interface AlsData {
  user: any;
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >;
}

@Injectable()
export class Als extends AsyncLocalStorage<AlsData> {}
