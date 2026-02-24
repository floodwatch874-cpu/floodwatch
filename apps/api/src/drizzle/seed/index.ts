import { seedProfileInfo } from './profile-info.seed';
import { seedUsers } from './users.seed';
import { db } from './utils/db';

async function main() {
  console.log('🚀 Starting database seeding...');

  await seedUsers(30);
  await seedProfileInfo();

  console.log('🎉 Database seeding completed');
}

void main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(() => {
    // Close DB connection
    void db.$client.end();
  });
