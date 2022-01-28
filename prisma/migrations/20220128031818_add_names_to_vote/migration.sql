/*
  Warnings:

  - Added the required column `votedAgainstName` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedForName` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "votedFor" INTEGER NOT NULL,
    "votedForName" TEXT NOT NULL,
    "votedAgainst" INTEGER NOT NULL,
    "votedAgainstName" TEXT NOT NULL
);
INSERT INTO "new_Vote" ("id", "votedAgainst", "votedFor") SELECT "id", "votedAgainst", "votedFor" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
