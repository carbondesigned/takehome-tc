-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('MATH', 'SCIENCE', 'HISTORY', 'ENGLISH');

-- CreateTable
CREATE TABLE "Acedemics" (
    "id" SERIAL NOT NULL,
    "subject" "Subject" NOT NULL,
    "score" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "studentId" INTEGER,

    CONSTRAINT "Acedemics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Acedemics" ADD CONSTRAINT "Acedemics_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

