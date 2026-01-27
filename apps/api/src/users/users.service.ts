import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle-connection';
import { type DrizzleDB } from '../drizzle/types/drizzle';
import { users } from 'src/drizzle/schemas/users.schema';
import { eq } from 'drizzle-orm';
import { profileInfo } from 'src/drizzle/schemas/profile-info.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async findByIdWithProfile(userId: number) {
    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        profile: {
          firstName: profileInfo.firstName,
          lastName: profileInfo.lastName,
          profilePicture: profileInfo.profilePicture,
        },
      })
      .from(users)
      .where(eq(users.id, userId))
      .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
      .limit(1);

    return user;
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    homeAddress: string,
  ) {
    const [newUser] = await this.db
      .insert(users)
      .values({ email, hashedPassword: password })
      .returning();

    const [newProfile] = await this.db
      .insert(profileInfo)
      .values({
        userId: newUser.id,
        firstName,
        lastName,
        homeAddress,
      })
      .returning();

    return { ...newUser, profile: newProfile };
  }

  async updatePassword(id: number, hashedPassword: string) {
    await this.db.update(users).set({ hashedPassword }).where(eq(users.id, id));
  }
}
