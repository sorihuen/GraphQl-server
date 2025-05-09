import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.country_TB.createMany({
    data: [
      { id: 1, CountryName: 'Colombia', CountryCode: 'CO' },
      { id: 2, CountryName: 'México', CountryCode: 'MX' },
      { id: 3, CountryName: 'Argentina', CountryCode: 'AR' },
    ],
    skipDuplicates: true,
  });

  await prisma.typeDocument_TB.createMany({
    data: [
      { id: 1, NameTypeDocument: 'Cédula de Ciudadanía' },
      { id: 2, NameTypeDocument: 'Pasaporte' },
      { id: 3, NameTypeDocument: 'Cédula de Extranjería' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Seed ejecutado correctamente');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
