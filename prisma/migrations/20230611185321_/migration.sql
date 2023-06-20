/*
  Warnings:

  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `BigInt`.
  - You are about to alter the column `balance_after` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expenditureId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "balance_after" BIGINT NOT NULL,
    "reference" TEXT NOT NULL,
    "ticket" TEXT NOT NULL,
    "date_doc" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "transactions_expenditureId_fkey" FOREIGN KEY ("expenditureId") REFERENCES "expenditures" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "transactions_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_transactions" ("amount", "balance_after", "createdAt", "date_doc", "description", "expenditureId", "id", "reference", "supplierId", "ticket", "type", "updatedAt") SELECT "amount", "balance_after", "createdAt", "date_doc", "description", "expenditureId", "id", "reference", "supplierId", "ticket", "type", "updatedAt" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
