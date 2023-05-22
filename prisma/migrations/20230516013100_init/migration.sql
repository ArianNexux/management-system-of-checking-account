-- CreateTable
CREATE TABLE "instituition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "heightLogo" TEXT NOT NULL,
    "widthLogo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "instituition_id_key" ON "instituition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
