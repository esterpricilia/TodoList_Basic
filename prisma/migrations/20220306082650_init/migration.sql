-- CreateTable
CREATE TABLE "todo_list" (
    "id" SERIAL NOT NULL,
    "activity" VARCHAR(200) NOT NULL,
    "category" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "todo_list_pkey" PRIMARY KEY ("id")
);
