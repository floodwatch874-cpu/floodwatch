import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { doublePrecision } from 'drizzle-orm/pg-core';

export const safetyTypeEnum = pgEnum('safety_type', ['shelter', 'hospital']);

export const safety = pgTable('safety', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  location: text('location').notNull().default('Unknown location'),
  description: text('description'),
  image: text('image'),
  imagePublicId: text('image_public_id'),
  type: safetyTypeEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
