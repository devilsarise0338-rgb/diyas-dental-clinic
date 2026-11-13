-- ================================================================
-- Diya's Dental and General Care Clinic - Seed Data
-- ================================================================

-- Clear existing data if re-seeding
DELETE FROM appointments;
DELETE FROM reviews;
DELETE FROM services;
DELETE FROM doctors;

-- 1. Doctors (Confirmed names, qualification placeholder)
INSERT INTO doctors (id, name, designation, qualification, bio, photo_url) VALUES
(1, 'Dr. Neel Kamal', 'Chief Dental Surgeon', '[Qualification]', 'Dedicated dental professional providing gentle, comprehensive oral care and restorative treatments in Mansarovar for 9+ years.', '/images/doctor-neel-kamal.jpg'),
(2, 'Dr. Gopal Lal Singhal', 'Senior General Physician & Family Care Specialist', '[Qualification]', 'Experienced physician offering compassionate family health checkups, preventive medicine, and routine care under one roof.', '/images/doctor-gopal-singhal.jpg');

-- 2. Services (Dental & General Health Consultation)
INSERT INTO services (id, title, description, icon, category) VALUES
(1, 'Checkup and Cleaning', 'Comprehensive oral examination, ultrasonic scaling, and plaque removal to preserve lifelong dental wellness.', 'sparkles', 'dental'),
(2, 'Dental Fillings', 'Natural-shade composite restorations that seamlessly repair cavities and restore tooth durability.', 'shield', 'dental'),
(3, 'Root Canal Treatment', 'Gentle, modern endodontic therapy designed to eliminate tooth pain and save your natural tooth.', 'activity', 'dental'),
(4, 'Painless Extractions', 'Safe and atraumatic tooth removal procedures carried out with meticulous care and pain-relief protocol.', 'cross', 'dental'),
(5, 'Braces and Aligners', 'Orthodontic corrections including invisible clear aligners and modern braces for ideal alignment and confidence.', 'smile', 'dental'),
(6, 'Crowns and Bridges', 'Custom, precision-crafted ceramic crowns and bridges that restore full bite strength and aesthetic appeal.', 'award', 'dental'),
(7, 'Dentures', 'High-comfort complete and partial denture solutions engineered for stable chewing and natural aesthetics.', 'layers', 'dental'),
(8, 'Teeth Whitening', 'Clinical-grade brightening treatments to safely remove stains and renew your natural radiant smile.', 'sun', 'dental'),
(9, 'Kids'' Dentistry', 'Compassionate, kid-friendly dental visits fostering great hygiene habits early without fear or stress.', 'heart', 'dental'),
(10, 'General Health Consultation', 'Primary family medicine checkups, vitals monitoring, seasonal illness care, and holistic wellness guidance.', 'stethoscope', 'general');

-- 3. Sample Patient Reviews (Clearly marked is_sample = 1)
INSERT INTO reviews (id, patient_name, rating, comment, is_sample) VALUES
(1, 'Patient Name (Sample)', 5, 'Sample review: Friendly doctors and extremely gentle dental treatment. The clinic has maintained high hygiene standards right here in Mansarovar.', 1),
(2, 'Patient Name (Sample)', 5, 'Sample review: Very polite communication and thorough explanation of the treatment plan. Having both dental and general care in one place is very convenient.', 1),
(3, 'Patient Name (Sample)', 5, 'Sample review: Highly reassuring experience for my entire family. Dr. Neel Kamal and Dr. Gopal Lal Singhal provide attentive, calm patient care.', 1),
(4, 'Patient Name (Sample)', 5, 'Sample review: Clean clinic atmosphere, gentle checkups, and transparent advice. A trusted neighbourhood healthcare clinic.', 1);

-- 4. Initial Demo Appointments
INSERT INTO appointments (id, patient_name, phone, service_id, preferred_date, preferred_time, message, status) VALUES
(1, 'Aarav Sharma', '[Phone]', 3, '2026-11-15', '[Timings]', 'Requesting routine dental consultation.', 'confirmed'),
(2, 'Sunita Verma', '[Phone]', 1, '2026-11-16', '[Timings]', 'Teeth cleaning and general health checkup.', 'pending');
