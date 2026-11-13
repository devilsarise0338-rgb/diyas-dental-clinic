-- ================================================================
-- Diya's Dental and General Care Clinic - Database Schema
-- Compatible with SQLite, MySQL, and PostgreSQL
-- ================================================================

CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(150) NOT NULL,
  qualification VARCHAR(150) NOT NULL DEFAULT '[Qualification]',
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'tooth',
  category VARCHAR(50) NOT NULL DEFAULT 'dental',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service_id INTEGER,
  preferred_date VARCHAR(20) NOT NULL,
  preferred_time VARCHAR(20) DEFAULT '[Timings]',
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name VARCHAR(150) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  is_sample INTEGER NOT NULL DEFAULT 1, -- 1 for Sample review placeholders
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
