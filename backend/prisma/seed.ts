import { PrismaClient } from '../src/generated/client';

const prisma = new PrismaClient();

interface addSeedUserParams {
  username: string;
  password: string;
}

const addSeedUser = async (): Promise<void> => {
  const seedUserUserName: string = 'testUser';
  const seedUserPassword: string = 'asdf1234';
  const seedUserNumber = 100;
  const testUser: addSeedUserParams[] = [];

  for (let i = 0; i < seedUserNumber; i++) {
    testUser.push({
      username: `${seedUserUserName}_${i + 1}`,
      password: seedUserPassword,
    })
  }

  await prisma.user.createMany({
    data: testUser,
    skipDuplicates: true,
  })

  console.log('🌱 Seeding completed.')
}

addSeedUser()
.catch((e) => {
  console.error('❌ Error during seeding:', e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
  console.log('🔌 Prisma client disconnected.');
})