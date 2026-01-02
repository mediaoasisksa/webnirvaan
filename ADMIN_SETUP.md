# Admin Dashboard Setup Guide

## Overview

The admin dashboard allows you to:
- View and manage contact form submissions
- Configure email settings (SMTP) through the web interface
- Manage contact information

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Database Migrations

```bash
npx prisma generate
npx prisma migrate dev --name add_admin_and_email_settings
```

### 3. Create Admin User

Create an admin user using the script:

```bash
npm run create-admin
```

Or with custom email/password:

```bash
node scripts/create-admin.js admin@example.com yourpassword123
```

Default credentials (if using default):
- Email: `admin@webnirvaan.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change the default password after first login!**

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access Admin Dashboard

Navigate to: `http://localhost:3000/admin/login`

## Using the Admin Dashboard

### Login

1. Go to `/admin/login`
2. Enter your admin email and password
3. Click "Sign in"

### Dashboard

The dashboard shows:
- Total contacts count
- Recent contacts (last 7 days)
- Quick access to contacts and email settings

### View Contacts

1. Navigate to "Contacts" in the navigation
2. View all contact form submissions
3. Use search to filter by name, email, or message
4. Use pagination to browse through contacts

### Configure Email Settings

1. Navigate to "Email Settings" in the navigation
2. Fill in your SMTP configuration:
   - **SMTP Host**: e.g., `smtp.gmail.com`
   - **SMTP Port**: Usually `587` (TLS) or `465` (SSL)
   - **Use SSL/TLS**: Check if using port 465
   - **SMTP Username/Email**: Your email address
   - **SMTP Password**: Your password or app password
   - **Admin Email**: Where notifications should be sent
3. Click "Save Settings"

**Gmail Setup:**
- Enable 2-Step Verification
- Generate App Password: https://myaccount.google.com/apppasswords
- Use the App Password (16 characters) as SMTP Password

**Note:** If you leave the password field blank, the existing password will be preserved.

## Security Notes

1. **Change Default Password**: Always change the default admin password
2. **Strong Passwords**: Use strong, unique passwords
3. **JWT Secret**: Ensure `JWT_SECRET` in `.env` is strong and random
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Never commit `.env` file to version control

## API Endpoints

All admin API endpoints require authentication via Bearer token:

- `POST /api/admin/login` - Admin login
- `GET /api/admin/contacts` - List contacts (paginated, searchable)
- `GET /api/admin/email-settings` - Get email settings
- `POST /api/admin/email-settings` - Update email settings

## Troubleshooting

### Cannot Login
- Verify admin user exists: Check database or create new admin
- Check password is correct
- Verify JWT_SECRET is set in `.env`

### Email Settings Not Saving
- Check database connection
- Verify admin is authenticated (check token in localStorage)
- Check browser console for errors

### Contacts Not Loading
- Verify database connection
- Check admin authentication
- Verify contacts exist in database

### Email Not Sending After Configuring
- Verify SMTP settings are correct
- Test with a simple email client first
- Check server logs for errors
- For Gmail: Ensure App Password is used, not regular password

## Creating Additional Admin Users

You can create additional admin users using the script:

```bash
node scripts/create-admin.js newadmin@example.com securepassword123
```

Or programmatically using Prisma:

```javascript
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createAdmin() {
  const password = await bcrypt.hash('yourpassword', 10)
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: password,
    },
  })
}
```
