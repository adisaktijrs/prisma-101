import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "Sak",
      email: "sak@gmail.com",
      age: 25,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // include: {
    //   userPreference: true,
    // },
    select: {
      name: true,
      userPreference: { select: { id: true } },
    },
  });

  console.log(user);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
