import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seedData = [
    {
      id: "price_1NUL3OBAPlcBoDEX9eBw8WFH",
      name: "Zoppen Passport Holder / Wallet, Navy Blue",
      price: 899,
      currency: "USD",
      image: "/Zoppen.jpg",
      category: "Others",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NViGKBAPlcBoDEX2gAkly4C",
      name: "Texas Instruments TI-30XIIS Scientific Calculator",
      price: 1000,
      currency: "USD",
      image: "/calculator.jpg",
      category: "Electronics",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NViWWBAPlcBoDEXgRBEiADe",
      name: "Amazon Basics Wired Keyboard",
      price: 1000,
      currency: "USD",
      image: "/keyboard.jpg",
      category: "Electronics",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NVhvABAPlcBoDEX533SDjKl",
      name: "Madden NFL19",
      price: 1250,
      currency: "USD",
      image: "/madden19.jpg",
      category: "Games",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NUKwBBAPlcBoDEXdvLOlnIz",
      name: "Horizon Zero Dawn: Complete Edition",
      price: 1499,
      currency: "USD",
      image: "/HorizonZeroDawn.jpg",
      category: "Games",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NVhzcBAPlcBoDEXPCOZuo0q",
      name: "NBA 2K19",
      price: 1500,
      currency: "USD",
      image: "/nba.jpg",
      category: "Games",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NUKeyBAPlcBoDEXHylTqXY4",
      name: "Effective Java, 3rd Edition",
      price: 3500,
      currency: "USD",
      image: "/EffectiveJava.jpg",
      category: "Books",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NVi5UBAPlcBoDEX9dh95ixd",
      name: "Starting Out with C++ from Control Structures to Objects (9th Edition)",
      price: 6500,
      currency: "USD",
      image: "/startingOut.jpg",
      category: "Books",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "price_1NViQFBAPlcBoDEXDjFppRam",
      name: "Assembly Language for the IBM PC Family (3rd Edition)",
      price: 10000,
      currency: "USD",
      image: "/assemble.jpg",
      category: "Books",
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const product of seedData) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
