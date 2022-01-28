-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "votedFor" INTEGER NOT NULL,
    "votedForName" TEXT NOT NULL,
    "votedAgainst" INTEGER NOT NULL,
    "votedAgainstName" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
