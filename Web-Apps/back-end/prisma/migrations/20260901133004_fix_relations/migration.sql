/*
  Warnings:

  - You are about to drop the column `departmentId` on the `sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_departmentId_fkey";

-- AlterTable
ALTER TABLE "sections" DROP COLUMN "departmentId",
ADD COLUMN     "department_id" INTEGER;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
