-- CreateTable
CREATE TABLE "MurtiPhoto" (
    "id" TEXT NOT NULL,
    "murtiItemId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MurtiPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MurtiPhoto" ADD CONSTRAINT "MurtiPhoto_murtiItemId_fkey" FOREIGN KEY ("murtiItemId") REFERENCES "MurtiItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
