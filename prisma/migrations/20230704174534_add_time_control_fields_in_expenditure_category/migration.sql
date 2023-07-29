/*
  Warnings:

  - You are about to drop the `ExpenditureCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ExpenditureCategory_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExpenditureCategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "expenditure_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenditures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "expenditures_type_fkey" FOREIGN KEY ("type") REFERENCES "expenditure_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_expenditures" ("createdAt", "id", "name", "type", "updatedAt") SELECT "createdAt", "id", "name", "type", "updatedAt" FROM "expenditures";
DROP TABLE "expenditures";
ALTER TABLE "new_expenditures" RENAME TO "expenditures";
CREATE UNIQUE INDEX "expenditures_id_key" ON "expenditures"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "expenditure_category_id_key" ON "expenditure_category"("id");
