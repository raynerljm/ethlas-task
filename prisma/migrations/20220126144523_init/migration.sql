-- CreateTable
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "votedFor" INTEGER NOT NULL,
    "votedAgainst" INTEGER NOT NULL
);
