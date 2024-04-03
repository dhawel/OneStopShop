import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { InfoCard } from "@/components/admin/info-card";
import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Box } from "lucide-react";
// import { columns } from "./components/columns";
// import { DataTable } from "./components/data-table";

async function getData() {
  const user = await currentUser();
  const userEmailAddress = user?.emailAddresses[0].emailAddress;
  if (!userEmailAddress) return [];
  const storeOrders = await db
    .select({
      id: orders.id,
      items: orders.items,
      total: orders.total,
      prettyOrderId: orders.prettyOrderId,
      stripePaymentIntentStatus: orders.stripePaymentIntentStatus,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.email, userEmailAddress));
  return storeOrders;
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <div>
      <div className="mb-6">
        <HeadingAndSubheading
          heading="Your purchases"
          subheading="View and manage purchases you've made"
        />
      </div>
      {/* {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <InfoCard
          heading="No orders"
          subheading="You haven't placed any orders yet."
          icon={<Box size={30} />}
        />
      )} */}
      <InfoCard
          heading="No orders"
          subheading="You haven't placed any orders yet."
          icon={<Box size={30} />}
        />
    </div>
  );
}
