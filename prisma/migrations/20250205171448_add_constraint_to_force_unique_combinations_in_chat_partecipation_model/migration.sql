/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatId]` on the table `ChatPartecipation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatPartecipation_userId_chatId_key" ON "ChatPartecipation"("userId", "chatId");
