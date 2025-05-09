-- CreateTable
CREATE TABLE "AppUser_TB" (
    "id" SERIAL NOT NULL,
    "LastName" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "IsMilitar" BOOLEAN NOT NULL,
    "IsTemporal" BOOLEAN NOT NULL,
    "TimeCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,

    CONSTRAINT "AppUser_TB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDocument_TB" (
    "UserID" INTEGER NOT NULL,
    "Document" TEXT NOT NULL,
    "TypeDocumentID" INTEGER NOT NULL,
    "PlaceExpedition" TEXT NOT NULL,
    "DateExpedition" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDocument_TB_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "TypeDocument_TB" (
    "id" SERIAL NOT NULL,
    "NameTypeDocument" TEXT NOT NULL,

    CONSTRAINT "TypeDocument_TB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country_TB" (
    "id" SERIAL NOT NULL,
    "CountryCode" TEXT NOT NULL,
    "CountryName" TEXT NOT NULL,

    CONSTRAINT "Country_TB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo_TB" (
    "id" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "CellPhone" TEXT NOT NULL,
    "EmergencyName" TEXT NOT NULL,
    "EmergencyPhone" TEXT NOT NULL,
    "CountryID" INTEGER NOT NULL,

    CONSTRAINT "ContactInfo_TB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_TB_username_key" ON "AppUser_TB"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_TB_email_key" ON "AppUser_TB"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_TB_UserID_key" ON "ContactInfo_TB"("UserID");

-- AddForeignKey
ALTER TABLE "UserDocument_TB" ADD CONSTRAINT "UserDocument_TB_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "AppUser_TB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument_TB" ADD CONSTRAINT "UserDocument_TB_TypeDocumentID_fkey" FOREIGN KEY ("TypeDocumentID") REFERENCES "TypeDocument_TB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo_TB" ADD CONSTRAINT "ContactInfo_TB_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "AppUser_TB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo_TB" ADD CONSTRAINT "ContactInfo_TB_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country_TB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
