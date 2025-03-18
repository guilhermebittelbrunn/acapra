import { configDotenv } from 'dotenv';
import { Client } from 'pg';
import { v4 as uuid } from 'uuid';

import { exec } from 'child_process';
import { promisify } from 'util';

configDotenv();

const execSync = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export async function setupPostgresSchema() {
  const dbUser = process.env.POSTGRES_USER;
  const dbPass = process.env.POSTGRES_PASSWORD;
  const dbHost = process.env.POSTGRES_HOST;
  const dbPort = process.env.POSTGRES_PORT;
  const dbName = process.env.POSTGRES_DB;

  global.schema = `test_${uuid()}`;
  global.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${global.schema}`;

  process.env.POSTGRES_URL = global.connectionString;
  global.process.env.POSTGRES_URL = global.connectionString;

  console.info(`Running prisma migrate (${global.schema}...`);

  await execSync(`${prismaBinary} migrate deploy --preview-feature`);
}

export async function teardownPostgresSchema() {
  const client = new Client({
    connectionString: global.connectionString,
  });

  console.info(`Dropping schema (${global.schema})...`);

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "${global.schema}" CASCADE`);
  await client.end();
}
