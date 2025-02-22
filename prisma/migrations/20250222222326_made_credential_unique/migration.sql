/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Credential_name_userId_key" ON "Credential"("name", "userId");
