/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `orderdetail_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `orderdetail_ibfk_2`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_ibfk_1`;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `orderdetail`;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `payments`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `users`;
