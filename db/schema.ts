// schema.ts
import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  primaryKey
} from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name"),
  price: integer("price").default(0),
  description: text("description"),
  inventory: integer("inventory").default(0),
  images: text("images", { mode: "json" }),
  storeId: integer("store_id"),
});

export type Product = typeof products.$inferSelect;

export const carts = sqliteTable("carts", {
  id: text("id").primaryKey(),
  items: text("items", {}),
  paymentIntentId: text("payment_intent_id"),
  clientSecret: text("client_secret"),
  isClosed: integer("is_closed", { mode: "boolean" }).default(false),
});

export type Cart = typeof carts.$inferSelect;

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  storeId: integer("store_id"),
  stripeAccountId: text("stripe_account_id"),
  stripeAccountCreatedAt: integer("stripe_account_created_at"),
  stripeAccountExpiresAt: integer("stripe_account_expires_at"),
  details_submitted: integer("details_submitted", { mode: "boolean" }).default(
    false
  ),
});

export type Payment = typeof payments.$inferSelect;

export const orders = sqliteTable(
  "orders",
  {
    id: integer("id").primaryKey({autoIncrement: true}),
    prettyOrderId: integer("pretty_order_id"),
    storeId: integer("store_id"),
    items: text("items", { mode: "json" }),
    total: integer("total").default(0),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripePaymentIntentStatus: text("stripe_payment_intent_status"),
    name: text("name"),
    email: text("email"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    addressId: integer("address"),
  },
  (table) => {
    return {
      stripePaymentIntentIdIndex: uniqueIndex(
        "stripe_payment_intent_id_index"
      ).on(table.stripePaymentIntentId),
    };
  }
);

export type Order = typeof orders.$inferSelect;
export const addresses = sqliteTable("addresses", {
  id: integer("id").primaryKey({autoIncrement: true}),
  line1: text("line1"),
  line2: text("line2"),
  city: text("city"),
  state: text("state"),
  postal_code: text("postal_code"),
  country: text("country"),
});

export type Address = typeof addresses.$inferSelect;
