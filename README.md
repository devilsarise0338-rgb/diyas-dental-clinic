# Diya's Dental and General Care Clinic — Full-Stack Web Application

A modern, high-end healthcare web platform built for **Diya's Dental and General Care Clinic**, Mansarovar, Jaipur. Designed with a **Bento-style healthcare brand aesthetic** (Apple-clean meets modern health tech): crisp pure-white surfaces, vibrant medical blue accents, fresh mint highlights, warm coral CTAs, and deep navy contrast sections.

---

## 📌 Confirmed Facts & Placeholders

### Confirmed Clinic Facts (Used Exactly)
- **Clinic Name:** Diya's Dental and General Care Clinic
- **Address:** 120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur
- **Attending Doctors:** Dr. Neel Kamal & Dr. Gopal Lal Singhal
- **Clinical Legacy:** Serving patients for 9+ years

### Configurable Placeholders
As strictly instructed, details that are not yet confirmed are **NOT invented**. Instead, they are maintained in a single configuration file (`client/src/config/clinic.js`) as explicit placeholders for the clinic owner to update:
- `phone`: `[Phone]`
- `whatsappNumber`: `[WhatsApp number]`
- `timings`: `[Timings]`
- `qualification`: `[Qualification]`
- `patient reviews`: clearly marked with `[Sample review]` badges

---

## 🛠 Tech Stack & Architecture

- **Frontend:**
  - React 19 + Vite
  - React Router DOM v7 (Multi-page + Anchor navigation)
  - Pure CSS Variables & Bento Grid system (no bloated external UI kits)
  - Custom High-Resolution Vector Assets (Studio illustration, Doctor portraits, Before/After smile comparison, Clinic logo)
  - Accessible `<Loader />` & Code-split route suspense
  - Bilingual Context Engine (English / हिन्दी toggle)
  - Lucide React (feather-style minimalist medical and UI icons)
  - Axios for REST API communication
- **Backend:**
  - Node.js + Express (REST API)
  - Input validation (rejects past dates, enforces name & phone requirements)
  - CORS, dotenv, JSON Web Tokens (JWT) for staff session management
  - Serverless adapter for Vercel deployment (`api/index.js`)
- **Database:**
  - SQLite (with auto-initialization in `/tmp` for serverless environments)
  - Standard SQL schema (`schema.sql` and `seed.sql`) compatible with MySQL and PostgreSQL
- **Hosting / Deployment:**
  - GitHub: `https://github.com/devilsarise0338-rgb/diyas-dental-clinic`
  - Vercel-ready with zero-config rewrites (`vercel.json`) and static asset cache headers

---

## 📁 Project Structure

```text
ClinicWebsite/
├── single-page-demo.html          # Self-contained single-file HTML preview (opens in any browser)
├── package.json                   # Root package script runner
├── vercel.json                    # Vercel deployment rewrites & asset caching headers
├── README.md                      # Complete installation and developer guide
├── api/                           # Vercel serverless entrypoint
│   └── index.js
├── client/                        # React Frontend (Vite)
│   ├── index.html                 # SEO Meta tags, Open Graph, Google Fonts & Schema.org JSON-LD
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── assets/                # Custom vector illustrations:
│   │       ├── logo.svg           # Modern clinic brand emblem
│   │       ├── clinic-studio.svg  # Dental studio interior illustration
│   │       ├── dr-neel-kamal.svg  # Doctor portrait illustration
│   │       ├── dr-gopal-singhal.svg# Physician portrait illustration
│   │       ├── smile-before.svg   # Pre-treatment dental illustration
│   │       └── smile-after.svg    # Post-treatment radiant smile
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                # Lazy-loaded page routes & suspense
│       ├── config/
│       │   └── clinic.js          # Master config for placeholders, contacts, translations
│       ├── context/
│       │   └── LanguageContext.jsx# Bilingual toggle (English / हिन्दी)
│       ├── services/
│       │   └── api.js             # Axios client with fallback handling
│       ├── styles/
│       │   ├── variables.css      # Bento Healthcare palette tokens & spacing
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
│       │   ├── Loader.css
│       │   ├── Pages.css
│       │   └── Admin.css
│       ├── components/
│       │   ├── Navbar.jsx         # Clean white navbar, single line, EN/हिं toggle & coral CTA
│       │   ├── Hero.jsx           # Bento cluster: Studio visual + 9+ Years + 2 Doctors
│       │   ├── TrustStrip.jsx     # 4 confirmed clinic trust badges
│       │   ├── Services.jsx       # Bento grid with featured card & category filters
│       │   ├── Doctors.jsx        # Dr. Neel Kamal & Dr. Gopal Lal Singhal cards
│       │   ├── WhyUs.jsx          # Dark navy section with animated stat counters
│       │   ├── Gallery.jsx        # Interactive before-and-after smile comparison slider
│       │   ├── Reviews.jsx        # Sample reviews carousel with nav arrows & owner badges
│       │   ├── AppointmentForm.jsx# Booking form with validation & WhatsApp follow-up link
│       │   ├── Location.jsx       # Embedded Google Map for Mansarovar address
│       │   ├── Footer.jsx         # Dark navy 3-column footer with top CTA strip
│       │   ├── FloatingButtons.jsx# Sticky mobile bottom bar + desktop WhatsApp pill
│       │   └── Loader.jsx         # Accessible pulsing loading spinner
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
    │   └── connection.js          # SQLite connection (supports serverless /tmp)
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

## 🚀 Quick Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher; v20/v22 recommended)
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

## ☁️ Deploying to Vercel

The repository is fully configured for zero-friction Vercel deployment:

1. Import the repository in [Vercel](https://vercel.com): `https://github.com/devilsarise0338-rgb/diyas-dental-clinic`
2. **Framework Preset:** Vite
3. **Build Command:** `npm --prefix client install && npm --prefix client run build`
4. **Output Directory:** `client/dist`
5. Optional Environment Variables in Vercel:
   - `ADMIN_PASSWORD`: Your secret admin password (defaults to `admin123`)
   - `JWT_SECRET`: Random secret string for JWT tokens
6. Click **Deploy**. Vercel will automatically build the client and route `/api/*` to the serverless function.

---

## 🔐 Admin Portal (`/admin`)

The demo includes a full-featured staff administration panel to demonstrate real working booking management to the clinic owner.

- **URL:** `/admin`
- **Default Username:** `admin`
- **Default Password:** `admin123` *(configurable via `ADMIN_PASSWORD`)*

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
