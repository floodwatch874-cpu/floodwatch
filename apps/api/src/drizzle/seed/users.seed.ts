import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { db } from './utils/db';
import * as schema from '../schemas';

export async function seedUsers(length: number) {
  try {
    console.log('🌱 Seeding users...');
    const hash = await bcrypt.hash('password123', 10);

    for (let i = 0; i < length; i++) {
      const email = faker.internet.email().toLowerCase();

      // Insert user
      const [user] = await db
        .insert(schema.users)
        .values({ email })
        .returning();

      // Insert auth account for the user
      await db.insert(schema.authAccounts).values({
        userId: user.id,
        provider: 'local',
        providerId: email, // Using email as providerId for local accounts
        hashedPassword: hash,
      });
    }

    console.log('✅ Users seeded');
  } catch (err) {
    console.log('❌ Failed to seed users:', err);
  }
}
