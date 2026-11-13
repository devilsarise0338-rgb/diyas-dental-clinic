# Diya's Dental and General Care Clinic — Full-Stack Demo Website

A high-end, production-style dental and general family healthcare web application built for **Diya's Dental and General Care Clinic**, Mansarovar, Jaipur. Designed with the aesthetics of an exclusive private dental studio: deep teal/navy, warm whites, and soft champagne gold accents.

---

## 📌 Confirmed Facts & Placeholders

### Confirmed Clinic Facts (Used Exactly)
- **Clinic Name:** Diya's Dental and General Care Clinic
- **Address:** 120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur
- **Attending Doctors:** Dr. Neel Kamal & Dr. Gopal Lal Singhal
- **Clinical Legacy:** Serving patients for 9+ years

### Configurable Placeholders
As strictly instructed, details that are not yet confirmed are **NOT invented**. Instead, they are kept in a single configuration file (`client/src/config/clinic.js`) as explicit placeholders for the clinic owner to update:
- `phone`: `[Phone]`
- `whatsappNumber`: `[WhatsApp number]`
- `timings`: `[Timings]`
- `qualification`: `[Qualification]`
- `patient reviews`: clearly marked with `[Sample review]` badges

---

## 🛠 Tech Stack

- **Frontend:**
  - React 19 + Vite
  - React Router DOM v7 (Multi-page + Anchor navigation)
  - Plain CSS (CSS Variables, component-scoped CSS, no bloated UI frameworks)
  - Lucide React (feather-style minimalist medical and UI icons)
  - Axios for REST API communication
  - Bilingual Context Engine (English / हिन्दी toggle)
- **Backend:**
  - Node.js + Express (REST API)
  - Input validation (rejects past dates, enforces name & phone requirements)
  - CORS, dotenv, JSON Web Tokens (JWT) for staff session management
- **Database:**
  - SQLite (native zero-dependency engine with automatic table initialization and seeding)
  - Standard SQL schema (`schema.sql` and `seed.sql`) compatible with MySQL and PostgreSQL

---

## 📁 Project Structure

```text
ClinicWebsite/
├── single-page-demo.html          # Self-contained single-file HTML preview (opens in any browser)
├── package.json                   # Root package script runner
├── README.md                      # Complete installation and developer guide
├── client/                        # React Frontend (Vite)
│   ├── index.html                 # SEO Meta tags, Google Fonts & Schema.org JSON-LD
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── config/
│       │   └── clinic.js          # Master config for placeholders, contacts, translations
│       ├── context/
│       │   └── LanguageContext.jsx# Bilingual toggle (English / हिन्दी)
│       ├── services/
│       │   └── api.js             # Axios client with fallback handling
│       ├── styles/
│       │   ├── variables.css      # Luxury Teal, Gold & White palette tokens
│       │   ├── global.css         # Typography, reset, and utility classes
│       │   ├── Navbar.css
│       │   ├── Hero.css
│       │   ├── TrustStrip.css
│       │   ├── Services.css
│       │   ├── Doctors.css
│       │   ├── WhyUs.css
│       │   ├── Gallery.css
│       │   ├── Reviews.css
│       │   ├── AppointmentForm.css
│       │   ├── Location.css
│       │   ├── Footer.css
│       │   ├── FloatingButtons.css
│       │   ├── Pages.css
│       │   └── Admin.css
│       ├── components/
│       │   ├── Navbar.jsx         # Glass-morphic sticky navbar with language switcher
│       │   ├── Hero.jsx           # Abstract tooth & smile illustration SVG + CTAs
│       │   ├── TrustStrip.jsx     # 4 confirmed clinic trust badges
│       │   ├── Services.jsx       # 10 clinical services with category filter & editable note
│       │   ├── Doctors.jsx        # Dr. Neel Kamal & Dr. Gopal Lal Singhal cards
│       │   ├── WhyUs.jsx          # Painless care, sterilisation, honest guidance
│       │   ├── Gallery.jsx        # Interactive before-and-after drag slider
│       │   ├── Reviews.jsx        # Sample reviews carousel with owner badges
│       │   ├── AppointmentForm.jsx# Booking form with validation & WhatsApp follow-up link
│       │   ├── Location.jsx       # Embedded Google Map for Mansarovar address
│       │   ├── Footer.jsx         # Links, clinic hours, copyright
│       │   └── FloatingButtons.jsx# Mobile-first floating WhatsApp & Call pills
│       └── pages/
│           ├── Home.jsx           # Complete landing studio experience
│           ├── ServicesPage.jsx   # Detailed treatments view
│           ├── AboutPage.jsx      # Doctor profiles & 9+ years history
│           ├── ContactPage.jsx    # Location & directions
│           └── AdminPage.jsx      # Staff portal for managing patient bookings
└── server/                        # Node.js Express REST API
    ├── server.js                  # Express application & route mounting
    ├── schema.sql                 # SQL table declarations (SQLite / MySQL / Postgres)
    ├── seed.sql                   # Initial confirmed doctors & treatment catalog
    ├── .env                       # Environment variables
    ├── .env.example
    ├── db/
    │   └── connection.js          # SQLite connection and automatic schema runner
    ├── middleware/
    │   └── auth.js                # JWT & header-based admin authentication
    ├── routes/
    │   ├── doctorsRoutes.js
    │   ├── servicesRoutes.js
    │   ├── reviewsRoutes.js
    │   ├── appointmentsRoutes.js
    │   └── adminRoutes.js
    └── controllers/
        ├── doctorsController.js
        ├── servicesController.js
        ├── reviewsController.js
        ├── appointmentsController.js
        └── adminController.js
```

---

## 🚀 Quick Setup & Running

### Prerequisites
- Node.js (v18 or higher; v22/v24 recommended)
- npm (v9 or higher)

### 1. Start the Backend API Server
```bash
cd server
npm install
npm start
```
The server will start on: **http://localhost:5000**
- Health check: `http://localhost:5000/api/health`
- Automatically loads and seeds `clinic.db` on first launch.

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
The client will start on: **http://localhost:3000**

---

## 🔐 Admin Portal (`/admin`)

The demo includes a full-featured staff administration panel to demonstrate real working booking management to the clinic owner.

- **URL:** `http://localhost:3000/admin`
- **Default Username:** `admin`
- **Default Password:** `admin123` *(configurable in `server/.env` via `ADMIN_PASSWORD`)*

### Admin Capabilities:
- View all patient booking requests in a clean table.
- Filter by status: `Pending`, `Confirmed`, `Cancelled`.
- Filter by preferred appointment date or search by patient name / phone.
- Update booking status with instant visual feedback.
- Real-time counters for Total Bookings, Pending, Confirmed, and Today's scheduled visits.

---

## ⚙️ How the Clinic Owner Can Update Placeholders

All clinic details are isolated in **`client/src/config/clinic.js`**. To replace placeholders with real details, simply edit that file:

```javascript
// client/src/config/clinic.js
export const CLINIC_CONFIG = {
  phone: "+91 98290 XXXXX",          // Replace [Phone]
  phoneRaw: "9198290XXXXX",
  whatsappNumber: "+91 98290 XXXXX", // Replace [WhatsApp number]
  whatsappRaw: "9198290XXXXX",
  timings: {
    weekdays: "9:30 AM - 1:30 PM, 5:00 PM - 8:30 PM", // Replace [Timings]
    sunday: "10:00 AM - 1:00 PM",
  },
  doctors: [
    {
      name: "Dr. Neel Kamal",
      qualification: "BDS, MDS - Oral & Maxillofacial Surgery", // Replace [Qualification]
    },
    {
      name: "Dr. Gopal Lal Singhal",
      qualification: "MBBS, MD - General Medicine",
    }
  ]
};
```

---

## 🌟 Standalone Single-Page File

If you need to show the design immediately on any computer, tablet, or phone without running Node:
- Open `single-page-demo.html` directly in Google Chrome, Microsoft Edge, Safari, or Firefox.
- It contains the complete styling, responsive layouts, bilingual English/Hindi toggle, interactive before-and-after slider, and prefilled WhatsApp booking action!
