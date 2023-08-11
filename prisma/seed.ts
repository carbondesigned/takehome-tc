import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  enum Subject {
    MATH = 'MATH',
    SCIENCE = 'SCIENCE',
    ENGLISH = 'ENGLISH',
    HISTORY = 'HISTORY',
  }
  // List of student names
  const studentNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Judy',
  ];

  // Iterate over each student name and create a student with associated academics
  for (const name of studentNames) {
    await prisma.student.create({
      data: {
        name: name,
        acedemics: {
          create: [
            {
              subject: Subject.MATH,
              score: Math.floor(Math.random() * 101), // Random score between 0 and 100
              feedback: 'Good job!',
            },
            {
              subject: Subject.SCIENCE,
              score: Math.floor(Math.random() * 101),
              feedback: 'Well done!',
            },
            {
              subject: Subject.ENGLISH,
              score: Math.floor(Math.random() * 101),
              feedback: 'Great work!',
            },
            {
              subject: Subject.HISTORY,
              score: Math.floor(Math.random() * 101),
              feedback: 'Keep it up!',
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
