# LIVING SPACE

A modern real-estate property discovery and enquiry platform built for **LIVING SPACE**, focused on residential properties across premium South Delhi neighbourhoods.

The project provides a public-facing property browsing experience along with a secure admin area for managing property listings and media.

---

## ✨ Features

### Public Website

- Premium responsive landing page
- Property discovery and browsing
- Location-based property filtering
- Property detail pages
- Multi-image property galleries
- Furnishing details
- Property facilities
- Rent and sale information
- Property availability information
- About page
- Contact page
- Responsive design for desktop, tablet, and mobile
- Smooth, subtle UI interactions

### Admin

- Secure Supabase authentication
- Protected admin dashboard
- Add new properties
- Upload property images
- Upload property videos
- Delete properties
- Automatic media cleanup during deletion
- Property status management
- Property metadata management

---

## 🏗️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- CSS
- Lucide icons

### Backend / Infrastructure

- [Supabase](https://supabase.com/)
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)
- Supabase Storage

### Storage

Two public Supabase Storage buckets are used:

- `property-images`
- `property-videos`

---

## 📁 Project Structure

The project follows a structure similar to:

```text
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   │
│   ├── properties/
│   │   └── [propertyId]/
│   │
│   ├── about/
│   ├── contact/
│   └── page.tsx
│
├── components/
│   ├── admin-property-form.tsx
│   ├── admin-login-form.tsx
│   ├── property-image-carousel.tsx
│   └── ...
│
└── lib/
    └── supabase/
        ├── client.ts
        ├── server.ts
        └── proxy.ts

public/
└── images/

supabase/
└── migrations/
