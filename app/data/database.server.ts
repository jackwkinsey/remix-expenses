import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare var global: {
	__db?: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
	prisma.$connect()
} else {
	if (!global.__db) {
		global.__db = new PrismaClient()
		global.__db.$connect()
	}
	prisma = global.__db as PrismaClient
}

export { prisma }
