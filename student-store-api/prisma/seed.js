const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

async function seed() {
  try {
    console.log("🌱 Seeding database...\n");

    /*
    Why I added the code belo: 
     -> Because the auto-increment IDs are never recycled, so deleting rows leaves holes.
     -> So this caused my  OrderItem rows still point to the old number giving us the foreign-key error.
    -> One possible solution is to  reset the sequence when you wipe data

    */
    await prisma.$transaction([
      // Step 1, we  delete rows
      prisma.orderItem.deleteMany(),
      prisma.order.deleteMany(),
      prisma.product.deleteMany(),

      // Step 2, reset the sequences so the next insert starts at 1 again
      prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq"            RESTART WITH 1`,
      prisma.$executeRaw`ALTER SEQUENCE "Order_order_id_seq"        RESTART WITH 1`,
      prisma.$executeRaw`ALTER SEQUENCE "OrderItem_order_item_id_seq" RESTART WITH 1`,
    ]);

    // Load JSON data
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf8")
    );

    const ordersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/orders.json"), "utf8")
    );

    // Seed products
    for (const product of productsData.products) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          category: product.category,
        },
      });
    }

    // // Seed orders and items
    // for (const order of ordersData.orders) {
    //   const createdOrder = await prisma.order.create({
    //     data: {
    //       customer_id: order.customer_id,
    //       total_price: order.total_price,
    //       status: order.status,
    //       created_at: new Date(order.created_at),
    //       order_items: {
    //         create: order.items.map((item) => ({
    //           product_id: item.product_id,
    //           quantity: item.quantity,
    //           price: item.price,
    //         })),
    //       },
    //     },
    //   });

    //   console.log(`✅ Created order #${createdOrder.id}`);
    // }

    console.log("\n🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
