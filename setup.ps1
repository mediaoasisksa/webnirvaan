<#
.SYNOPSIS
WebNirvaan local setup (Windows)

.DESCRIPTION
Installs dependencies, sets env, runs Prisma, starts Next.js
#>

Write-Host "Starting WebNirvaan setup..."

# ----------------------------
# Check Node.js
# ----------------------------
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed. Install Node.js 18+"
    exit 1
}

# ----------------------------
# Install dependencies
# ----------------------------
Write-Host "Installing npm dependencies..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed"
    exit 1
}

# ----------------------------
# Create .env if missing
# ----------------------------
if (-not (Test-Path ".env")) {

@"
DATABASE_URL=postgresql://postgres:password@localhost:5432/webnirvaan
JWT_SECRET=supersecretkey

RAZORPAY_KEY=
RAZORPAY_SECRET=

STRIPE_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_GA_ID=
"@ | Out-File -Encoding utf8 .env

    Write-Host ".env file created. Update credentials if needed."
}
else {
    Write-Host ".env already exists."
}

# ----------------------------
# Prisma generate
# ----------------------------
Write-Host "Generating Prisma client..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Error "Prisma generate failed"
    exit 1
}

# ----------------------------
# Prisma migrate
# ----------------------------
Write-Host "Running Prisma migration..."
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Error "Prisma migration failed"
    exit 1
}

# ----------------------------
# Optional admin creation
# ----------------------------
$createAdmin = Read-Host "Create default admin user? (Y/N)"

if ($createAdmin -eq "Y" -or $createAdmin -eq "y") {

$jsCode = @"
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  const email = "admin@webnirvaan.com";
  const password = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: { email, password }
  });

  console.log("Admin created:");
  console.log("Email: admin@webnirvaan.com");
  console.log("Password: admin123");

  process.exit(0);
})();
"@

    node -e $jsCode
}

# ----------------------------
# Start dev server
# ----------------------------
Write-Host "Starting Next.js dev server..."
npm run dev
