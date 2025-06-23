// models/prismaClient.js   (create if it doesn’t exist)
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = prisma
