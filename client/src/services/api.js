import axios from 'axios';
import { CLINIC_CONFIG } from '../config/clinic';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Attach Admin token if present in localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('diyas_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback seed services if backend is initializing
const FALLBACK_SERVICES = [
  { id: 1, title: 'Checkup and Cleaning', description: 'Comprehensive oral examination, ultrasonic scaling, and plaque removal to preserve lifelong dental wellness.', icon: 'sparkles', category: 'dental' },
  { id: 2, title: 'Dental Fillings', description: 'Natural-shade composite restorations that seamlessly repair cavities and restore tooth durability.', icon: 'shield', category: 'dental' },
  { id: 3, title: 'Root Canal Treatment', description: 'Gentle, modern endodontic therapy designed to eliminate tooth pain and save your natural tooth.', icon: 'activity', category: 'dental' },
  { id: 4, title: 'Painless Extractions', description: 'Safe and atraumatic tooth removal procedures carried out with meticulous care and pain-relief protocol.', icon: 'cross', category: 'dental' },
  { id: 5, title: 'Braces and Aligners', description: 'Orthodontic corrections including invisible clear aligners and modern braces for ideal alignment and confidence.', icon: 'smile', category: 'dental' },
  { id: 6, title: 'Crowns and Bridges', description: 'Custom, precision-crafted ceramic crowns and bridges that restore full bite strength and aesthetic appeal.', icon: 'award', category: 'dental' },
  { id: 7, title: 'Dentures', description: 'High-comfort complete and partial denture solutions engineered for stable chewing and natural aesthetics.', icon: 'layers', category: 'dental' },
  { id: 8, title: 'Teeth Whitening', description: 'Clinical-grade brightening treatments to safely remove stains and renew your natural radiant smile.', icon: 'sun', category: 'dental' },
  { id: 9, title: "Kids' Dentistry", description: 'Compassionate, kid-friendly dental visits fostering great hygiene habits early without fear or stress.', icon: 'heart', category: 'dental' },
  { id: 10, title: 'General Health Consultation', description: 'Primary family medicine checkups, vitals monitoring, seasonal illness care, and holistic wellness guidance.', icon: 'stethoscope', category: 'general' },
];

const FALLBACK_REVIEWS = [
  { id: 1, patient_name: 'Patient Name (Sample)', rating: 5, comment: 'Sample review: Friendly doctors and extremely gentle dental treatment. The clinic has maintained high hygiene standards right here in Mansarovar.', is_sample: 1 },
  { id: 2, patient_name: 'Patient Name (Sample)', 5: 5, rating: 5, comment: 'Sample review: Very polite communication and thorough explanation of the treatment plan. Having both dental and general care in one place is very convenient.', is_sample: 1 },
  { id: 3, patient_name: 'Patient Name (Sample)', rating: 5, comment: 'Sample review: Highly reassuring experience for my entire family. Dr. Neel Kamal and Dr. Gopal Lal Singhal provide attentive, calm patient care.', is_sample: 1 },
  { id: 4, patient_name: 'Patient Name (Sample)', rating: 5, comment: 'Sample review: Clean clinic atmosphere, gentle checkups, and transparent advice. A trusted neighbourhood healthcare clinic.', is_sample: 1 },
];

export async function fetchDoctors() {
  try {
    const res = await client.get('/doctors');
    return res.data.data;
  } catch (err) {
    console.warn('Using local fallback for doctors:', err.message);
    return CLINIC_CONFIG.doctors;
  }
}

export async function fetchServices() {
  try {
    const res = await client.get('/services');
    return res.data.data;
  } catch (err) {
    console.warn('Using fallback services list:', err.message);
    return FALLBACK_SERVICES;
  }
}

export async function fetchReviews() {
  try {
    const res = await client.get('/reviews');
    return res.data.data;
  } catch (err) {
    console.warn('Using fallback sample reviews:', err.message);
    return FALLBACK_REVIEWS;
  }
}

export async function bookAppointment(data) {
  const res = await client.post('/appointments', data);
  return res.data;
}

export async function adminLogin(credentials) {
  const res = await client.post('/admin/login', credentials);
  return res.data;
}

export async function fetchAdminAppointments(params = {}) {
  const res = await client.get('/admin/appointments', { params });
  return res.data;
}

export async function updateAppointmentStatus(id, status) {
  const res = await client.patch(`/admin/appointments/${id}`, { status });
  return res.data;
}
