import { PrismaClient } from "@prisma/client";
import { sources } from "./sources.mjs";

const prisma = new PrismaClient();

async function main() {
  for (const s of sources) {
    await prisma.source.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    console.log(`✔ ${s.name}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
