import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const activity = await prisma.activity.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Activity 1',
    },
  });

  const todo = await prisma.todo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Todo 1',
      activity_group_id: activity.id,
    },
  });

  console.log('Activity:', activity);
  console.log('Todo:', todo);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
