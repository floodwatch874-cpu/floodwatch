import {
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  serial,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { unique } from 'drizzle-orm/pg-core';

export const providerEnum = pgEnum('provider', ['local', 'google']);

export const authAccounts = pgTable(
  'auth_accounts',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    provider: providerEnum().notNull(),
    providerId: varchar('provider_id', { length: 255 }),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    uniqueProviderProviderId: unique().on(table.provider, table.providerId),
  }),
);
