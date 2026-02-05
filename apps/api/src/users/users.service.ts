import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle-connection';
import { type DrizzleDB } from '../drizzle/types/drizzle';
import { users } from 'src/drizzle/schemas/users.schema';
import { and, eq } from 'drizzle-orm';
import { authAccounts } from 'src/drizzle/schemas/auth-accounts.schema';
import * as bcrypt from 'bcrypt';
import { profileInfo } from 'src/drizzle/schemas/schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createUser(email: string, role: 'user' | 'admin' = 'user') {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const [user] = await this.db
      .insert(users)
      .values({ email, role })
      .returning();

    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async findById(id: number) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByIdWithProfile(id: number) {
    const [user] = await this.db
      .select()
      .from(users)
      .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.users.id,
      email: user.users.email,
      role: user.users.role,
      status: user.users.status,
      firstName: user.profile_info?.firstName,
      lastName: user.profile_info?.lastName,
      name: `${user.profile_info?.firstName || ''} ${
        user.profile_info?.lastName || ''
      }`.trim(),
      profilePicture: user.profile_info?.profilePicture,
      homeAddress: user.profile_info?.homeAddress,
      createdAt: user.users.createdAt,
    };
  }

  async updateUserStatus(id: number, status: 'active' | 'blocked') {
    const [user] = await this.db
      .update(users)
      .set({ status, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createAuthAccount(
    userId: number,
    provider: 'local' | 'google',
    providerId: string,
    hashedPassword?: string,
  ) {
    const [authAccount] = await this.db
      .insert(authAccounts)
      .values({
        userId,
        provider,
        providerId,
        hashedPassword,
      })
      .returning();

    return authAccount;
  }

  async findAuthAccount(id: number, provider: 'local' | 'google') {
    const [authAccount] = await this.db
      .select()
      .from(authAccounts)
      .where(
        and(eq(authAccounts.userId, id), eq(authAccounts.provider, provider)),
      )
      .limit(1);

    return authAccount || null;
  }

  async findAuthAccountByProviderId(
    provider: 'local' | 'google',
    providerId: string,
  ) {
    const [authAccount] = await this.db
      .select()
      .from(authAccounts)
      .where(
        and(
          eq(authAccounts.provider, provider),
          eq(authAccounts.providerId, providerId),
        ),
      )
      .limit(1);

    return authAccount || null;
  }

  async validatePassword(userId: number, password: string) {
    const authAccount = await this.findAuthAccount(userId, 'local');

    if (!authAccount || !authAccount.hashedPassword) {
      return false;
    }

    return await bcrypt.compare(password, authAccount.hashedPassword);
  }

  async updatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const [updatedAccount] = await this.db
      .update(authAccounts)
      .set({ hashedPassword })
      .where(
        and(
          eq(authAccounts.userId, userId),
          eq(authAccounts.provider, 'local'),
        ),
      )
      .returning();

    return updatedAccount;
  }

  async createUserProfile(
    userId: number,
    firstName: string,
    lastName: string,
    homeAddress: string,
  ) {
    const [user] = await this.db
      .insert(profileInfo)
      .values({
        userId,
        firstName,
        lastName,
        homeAddress,
      })
      .returning();

    return user;
  }

  async findProfileByUserId(id: number) {
    const [profile] = await this.db
      .select()
      .from(profileInfo)
      .where(eq(profileInfo.userId, id))
      .limit(1);

    return profile;
  }

  async updateProfile(
    userId: number,
    updates: {
      firstName?: string;
      lastName?: string;
      profilePicture?: string;
      homeAddress?: string;
    },
  ) {
    const [updatedProfile] = await this.db
      .update(profileInfo)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(profileInfo.userId, userId))
      .returning();

    return updatedProfile;
  }
}
