// Load environment variables from .env file
require('dotenv').config()

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@webnirvaan.com'
  const password = process.argv[3] || 'admin123'

  console.log('Creating admin user...')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const admin = await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
      },
      create: {
        email,
        password: hashedPassword,
      },
    })

    console.log('✅ Admin user created/updated successfully!')
    console.log(`ID: ${admin.id}`)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
