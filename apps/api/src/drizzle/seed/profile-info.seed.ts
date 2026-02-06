import { faker } from '@faker-js/faker';
import { db } from './utils/db';
import * as schema from '../schemas/schema';
import { eq, isNull } from 'drizzle-orm';

export async function seedProfileInfo() {
  try {
    console.log('🌱 Seeding profiles...');

    const usersWithoutProfile = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .leftJoin(
        schema.profileInfo,
        eq(schema.profileInfo.userId, schema.users.id),
      )
      .where(isNull(schema.profileInfo.userId));

    if (usersWithoutProfile.length === 0) {
      console.log('ℹ️ No new users to seed profiles for');
      return;
    }

    const data = usersWithoutProfile.map((user) => ({
      userId: user.id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profilePicture: faker.image.avatar(),
      homeAddress: faker.location.streetAddress(),
    }));

    await db.insert(schema.profileInfo).values(data);
    console.log('✅ Profiles seeded');
  } catch (err) {
    console.log('❌ Failed to seed profiles:', err);
  }
}
