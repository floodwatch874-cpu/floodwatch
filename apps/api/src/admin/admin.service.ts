import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminInput } from '@repo/schemas';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { type DrizzleDB } from 'src/drizzle/types/drizzle';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private usersService: UsersService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminInput) {
    const { email, password, first_name, last_name, home_address } =
      createAdminDto;

    const user = await this.usersService.findByEmail(email);
    if (user) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await this.usersService.createUser(email, 'admin');
    await this.usersService.createAuthAccount(
      newAdmin.id,
      'local',
      email,
      hashedPassword,
    );
    await this.usersService.createUserProfile(
      newAdmin.id,
      first_name,
      last_name,
      home_address,
    );

    return { message: 'Admin created successfully' };
  }

  async blockUser(id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersService.updateUserStatus(id, 'blocked');
    return { message: 'User blocked successfully' };
  }

  async unblockUser(id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersService.updateUserStatus(id, 'active');
    return { message: 'User unblocked successfully' };
  }
}
