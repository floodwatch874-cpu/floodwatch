import * as schema from './schemas';
import { db } from './seed/utils/db';
import { reset } from 'drizzle-seed';

async function main() {
  console.log('Resetting database...');

  await reset(db, schema);

  console.log('Database reset complete!');
}

main().catch(console.error);
