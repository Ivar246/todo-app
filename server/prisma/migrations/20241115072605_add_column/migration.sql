-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isFirstLogin" BOOLEAN NOT NULL DEFAULT false;
