# WebNirvaan - Services Website

A modern, professional website for showcasing web development, app development, and other digital services.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Next.js 14 and React  
- 📱 Fully responsive and mobile-friendly
- 🚀 Fast performance and SEO optimized..
- 💼 Services showcase section
- 📧 Contact form with database storage and email notifications
- 🌟 Beautiful animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager
- Email account (Gmail, SMTP, etc.) for contact form notifications

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database URL with your PostgreSQL credentials
   - Configure your email settings (SMTP)

```bash
cp .env.example .env
```

3. **Set up the database:**
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

4. **Configure Email:**
   - For Gmail: Enable 2FA and create an App Password
   - Update `SMTP_USER` and `SMTP_PASSWORD` in `.env`
   - Update `ADMIN_EMAIL` to receive contact form notifications

5. **Run the development server:**
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/webnirvaan"

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@webnirvaan.com
```

## Email Setup

### Gmail Setup
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as `SMTP_PASSWORD` in your `.env` file

### Other Email Providers
- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587
- **Custom SMTP**: Use your provider's SMTP settings

## Database Schema

The contact form submissions are stored in a `Contact` table with the following fields:
- `id`: Unique identifier
- `name`: Contact name
- `email`: Contact email
- `phone`: Contact phone (optional)
- `service`: Service interested in (optional)
- `message`: Message content
- `createdAt`: Timestamp
- `updatedAt`: Last updated timestamp

## API Routes

### POST `/api/contact`
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "web-development",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully",
  "id": "clx..."
}
```

### GET `/api/contact`
Retrieve contact submissions (for admin use).

**Query Parameters:**
- `limit`: Number of results (default: 10)
- `skip`: Number of results to skip (default: 0)

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Contact form API endpoint
│   ├── layout.tsx            # Root layout with Navbar and Footer
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Hero section
│   ├── Services.tsx          # Services showcase
│   ├── About.tsx             # About section
│   └── Contact.tsx           # Contact form
├── lib/
│   ├── prisma.ts             # Prisma client instance
│   └── email.ts              # Email utility functions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Customization

- Update service details in `components/Services.tsx`
- Modify company information in `components/About.tsx`
- Customize colors in `tailwind.config.ts`
- Update contact information in `components/Contact.tsx` and `components/Footer.tsx`
- Modify email templates in `lib/email.ts`

## Build for Production

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build the application
npm run build

# Start the production server
npm start
```

## Database Management

### View data in Prisma Studio
```bash
npx prisma studio
```

### Create a new migration
```bash
npx prisma migrate dev --name migration-name
```

### Reset the database (development only)
```bash
npx prisma migrate reset
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma (ORM)
- PostgreSQL
- Nodemailer (Email)
- HTML5
- CSS3

## License

This project is open source and available under the MIT License.
