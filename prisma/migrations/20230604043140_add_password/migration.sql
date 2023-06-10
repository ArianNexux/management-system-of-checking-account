-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'secret',
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT NOT NULL
);
INSERT INTO "new_employees" ("email", "id", "name", "photo", "position", "role") SELECT "email", "id", "name", "photo", "position", "role" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
