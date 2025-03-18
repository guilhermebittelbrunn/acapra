import { PrismaClient } from '@prisma/client';

import { runSeeding } from '../src/infra/database/seeding/main';

const prisma = new PrismaClient();

runSeeding(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
