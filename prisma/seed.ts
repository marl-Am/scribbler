import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const seedData = [
    {
      id: 1,
      name: "Product 1",
      price: 49.99,
      shortDescription: "This is a short description of Product 1",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
    {
      id: 2,
      name: "Product 2",
      price: 59.99,
      shortDescription: "This is a short description of Product 2",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      shortDescription: "This is a short description of Product 3",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
    {
      id: 4,
      name: "Product 4",
      price: 29.99,
      shortDescription: "This is a short description of Product 4",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
    {
      id: 5,
      name: "Product 5",
      price: 89.99,
      shortDescription: "This is a short description of Product 5",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
    {
      id: 6,
      name: "Product 6",
      price: 19.99,
      shortDescription: "This is a short description of Product 6",
      imageUrl: "/assets/product-image.jpg",
      stock: 1,
    },
  ];

  for (let product of seedData) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
