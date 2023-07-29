-- CreateTable
CREATE TABLE "ExpenditureCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenditures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "expenditures_type_fkey" FOREIGN KEY ("type") REFERENCES "ExpenditureCategory" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_expenditures" ("createdAt", "id", "name", "type", "updatedAt") SELECT "createdAt", "id", "name", "type", "updatedAt" FROM "expenditures";
DROP TABLE "expenditures";
ALTER TABLE "new_expenditures" RENAME TO "expenditures";
CREATE UNIQUE INDEX "expenditures_id_key" ON "expenditures"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ExpenditureCategory_id_key" ON "ExpenditureCategory"("id");
