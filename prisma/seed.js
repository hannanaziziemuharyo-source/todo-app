import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("guru123", 10);

  const hannan = await prisma.user.upsert({
    where: { email: "hannan@gmail.com" },
    update: {},
    // BIKIN DATA KE TABLE USER SEKALIGUS KE TABLE TEACHER(RELASI ONE TO ONE)
    create: {
      email: "hannan@gmail.com",
      password: password,
      teacher: {
        create: {
          fullName: "hannan",
          email: "hannan@gmail.com",
        },
      },
    },
  });

  console.log({ hannan });
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
