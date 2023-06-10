-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'secret',
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_employees" ("email", "id", "name", "password", "photo", "position", "role") SELECT "email", "id", "name", "password", "photo", "position", "role" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
CREATE TABLE "new_instituition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "heightLogo" TEXT NOT NULL,
    "widthLogo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_instituition" ("heightLogo", "id", "logo", "name", "title1", "title2", "widthLogo") SELECT "heightLogo", "id", "logo", "name", "title1", "title2", "widthLogo" FROM "instituition";
DROP TABLE "instituition";
ALTER TABLE "new_instituition" RENAME TO "instituition";
CREATE UNIQUE INDEX "instituition_id_key" ON "instituition"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
