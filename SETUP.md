# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/webnirvaan"
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@webnirvaan.com
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

3. **Set up database:**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   ```

4. **Configure email (Gmail example):**
   - Go to https://myaccount.google.com/apppasswords
   - Enable 2-Step Verification if not already enabled
   - Generate an App Password for "Mail"
   - Use this App Password as `SMTP_PASSWORD` in your `.env` file
   - Use your Gmail address as `SMTP_USER`

5. **Start development server:**
   ```bash
   npm run dev
   ```

## Database Setup

### PostgreSQL Installation

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Install PostgreSQL
- Note your password during installation
- Update `DATABASE_URL` in `.env`

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```sql
CREATE DATABASE webnirvaan;
```

Or using psql:
```bash
psql -U postgres
CREATE DATABASE webnirvaan;
\q
```

## Email Configuration

### Gmail Setup (Recommended for Development)

1. Enable 2-Step Verification on your Google Account
2. Generate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
3. Update `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   ADMIN_EMAIL=admin@webnirvaan.com
   ```

### Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Custom SMTP:**
Use your email provider's SMTP settings.

## Testing

1. **Test Database Connection:**
   ```bash
   npx prisma studio
   ```
   This opens a GUI to view your database.

2. **Test Contact Form:**
   - Go to http://localhost:3000
   - Fill out the contact form
   - Check your database: `npx prisma studio`
   - Check your email inbox (both admin notification and user confirmation)

3. **Check Logs:**
   - In development, email logs appear in the console
   - Database errors will also appear in the console

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- Ensure database exists
- Check user permissions

### Email Not Sending
- Verify SMTP credentials are correct
- For Gmail: Use App Password, not regular password
- Check firewall/network settings
- In development, check console logs
- Verify ADMIN_EMAIL is set correctly

### Prisma Issues
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to apply migrations
- Check `prisma/schema.prisma` for syntax errors

## Production Deployment

1. Set environment variables on your hosting platform
2. Run migrations: `npx prisma migrate deploy`
3. Ensure database is accessible from production
4. Use a production email service (SendGrid, AWS SES, etc.)
5. Set secure JWT_SECRET
6. Enable HTTPS

## Support

For issues or questions, check:
- Prisma docs: https://www.prisma.io/docs
- Next.js docs: https://nextjs.org/docs
- Nodemailer docs: https://nodemailer.com/about/
