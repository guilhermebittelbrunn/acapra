import { PrismaClient } from '@prisma/client';

import { specieBaseSeeding } from './specieBase';

export async function runSeeding(prisma: PrismaClient) {
  console.info('Seeding started...');

  /** Marketplace */
  await Promise.all(
    specieBaseSeeding.map((marketplace) =>
      prisma.specieBaseModel.upsert({
        where: { id: marketplace.id },
        update: {},
        create: marketplace,
      }),
    ),
  );
}
