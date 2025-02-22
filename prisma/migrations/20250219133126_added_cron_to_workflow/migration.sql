-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "cron" TEXT,
ADD COLUMN     "nextRunAt" TIMESTAMP(3);
