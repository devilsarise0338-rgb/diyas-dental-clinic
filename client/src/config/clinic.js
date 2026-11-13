/**
 * Diya's Dental and General Care Clinic - Master Configuration
 * All clinic details and configurable placeholders are maintained here.
 * Real clinic contact numbers and schedules can be swapped in this single file.
 */

export const CLINIC_CONFIG = {
  // CONFIRMED CLINIC FACTS
  name: "Diya's Dental and General Care Clinic",
  shortName: "Diya's Dental Studio",
  tagline: "Modern Dental & Family Healthcare Studio",
  yearsOfCare: "9+ Years",
  address: "120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur",
  city: "Jaipur, Rajasthan",
  pincode: "302020",
  googleMapsQuery: "120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=120A,+Shri+Ram+Vihar+A,+Manyawas,+Mansarovar,+Jaipur&output=embed",

  // PLACEHOLDERS (DO NOT INVENT - TO BE REPLACED BY OWNER)
  phone: "[Phone]",
  phoneRaw: "", // For tel: link when populated
  whatsappNumber: "[WhatsApp number]",
  whatsappRaw: "", // For direct wa.me link when populated
  email: "[Email Address]",
  timings: {
    weekdays: "[Timings]",
    sunday: "[Timings]",
  },
  establishedYear: "2015",

  // CONFIRMED DOCTORS (Qualifications kept as placeholders)
  doctors: [
    {
      id: 1,
      name: "Dr. Neel Kamal",
      designation: "Chief Dental Surgeon",
      qualification: "[Qualification]",
      experience: "9+ Years Clinical Practice",
      bio: "Specializing in painless single-sitting root canals, aesthetic smile alignment, crowns, and preventative dental wellness.",
      specialities: [
        "Painless Root Canal",
        "Aesthetic Smile Design",
        "Crowns & Bridges",
        "Preventative Care",
      ],
      photoPlaceholderText: "Dr. Neel Kamal",
    },
    {
      id: 2,
      name: "Dr. Gopal Lal Singhal",
      designation: "Senior General Physician",
      qualification: "[Qualification]",
      experience: "9+ Years Clinical Practice",
      bio: "Delivering compassionate family healthcare checkups, diagnostic consultations, and proactive wellness under one roof.",
      specialities: [
        "Family Medicine",
        "Routine Health Checkup",
        "Preventive Diagnostics",
        "Chronic Illness Care",
      ],
      photoPlaceholderText: "Dr. Gopal Lal Singhal",
    },
  ],

  // BENTO STATS & HIGHLIGHTS
  trustBadges: [
    { value: "9+", label: "Years of Trusted Care", sub: "Serving Mansarovar families", icon: "clock" },
    { value: "2", label: "Experienced Doctors", sub: "Dr. Neel Kamal & Dr. Gopal Lal Singhal", icon: "user-check" },
    { value: "100%", label: "Under One Roof", sub: "Complete dental & family health", icon: "shield" },
    { value: "Jaipur", label: "Mansarovar Location", sub: "Shri Ram Vihar A, Manyawas", icon: "map-pin" },
  ],

  // WHY CHOOSE US
  whyChooseUs: [
    {
      title: "Painless Treatment",
      desc: "Gentle injection protocols and modern restorative instruments for zero-fear visits.",
      icon: "feather",
    },
    {
      title: "Hospital-Grade Sterilisation",
      desc: "Multi-stage autoclaving and strict hygiene protocols protecting every patient.",
      icon: "shield-check",
    },
    {
      title: "Clear, Honest Guidance",
      desc: "Complete transparency about diagnostics, steps, and options before any treatment begins.",
      icon: "message-circle",
    },
    {
      title: "Affordable Family Care",
      desc: "High quality, ethical healthcare accessible to every household in Mansarovar.",
      icon: "heart-handshake",
    },
    {
      title: "Family-Friendly Atmosphere",
      desc: "Warm environment designed for children, working professionals, and elderly patients alike.",
      icon: "users",
    },
    {
      title: "Central Mansarovar Location",
      desc: "Situated at 120A, Shri Ram Vihar A, Manyawas, with easy neighbourhood parking.",
      icon: "navigation",
    },
  ],

  // BILINGUAL CONTENT DICTIONARY (English & Hindi)
  translations: {
    en: {
      navHome: "Home",
      navServices: "Services",
      navDoctors: "Doctors",
      navReviews: "Reviews",
      navContact: "Contact",
      navAdmin: "Admin",
      bookAppointment: "Book Appointment",
      callNow: "Call Now",
      chatWhatsApp: "WhatsApp",
      heroHeadline: "Your smile, in caring hands.",
      heroSubtext: "9+ years of trusted dental and family care in Mansarovar, Jaipur.",
      heroBadge: "Modern Dental & General Health Studio",
      servicesHeading: "Everything your family needs, under one roof.",
      servicesSubheading: "Explore gentle dental surgery and primary health consultations tailored for all generations.",
      servicesNote: "Note for clinic owner: Services, descriptions, and pricing are fully customizable.",
      doctorsHeading: "Meet our dedicated doctors",
      doctorsSubheading: "Over 9+ years of committed clinical practice in Mansarovar, Jaipur.",
      whyUsHeading: "Why Jaipur families trust us",
      whyUsSubheading: "A clinical practice built around clinical safety, painless procedures, and human warmth.",
      galleryHeading: "Smile Transformation Gallery",
      gallerySubheading: "Interactive comparison showing before-and-after aesthetic alignment and tooth restoration.",
      reviewsHeading: "What patients say about us",
      reviewsSubheading: "Real feedback from Mansarovar families we have had the privilege to treat.",
      sampleReviewNotice: "Notice: These are placeholder sample review cards ready to be updated with real patient feedback.",
      formHeading: "Book your appointment",
      formSubheading: "Choose your preferred time with Dr. Neel Kamal or Dr. Gopal Lal Singhal. Instant confirmation follow-up via WhatsApp.",
      locationHeading: "Visit our clinic in Mansarovar",
      locationSubheading: "120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur.",
    },
    hi: {
      navHome: "मुख्य",
      navServices: "सेवाएं",
      navDoctors: "डॉक्टर्स",
      navReviews: "समीक्षाएं",
      navContact: "संपर्क",
      navAdmin: "व्यवस्थापक",
      bookAppointment: "अपॉइंटमेंट लें",
      callNow: "कॉल करें",
      chatWhatsApp: "व्हाट्सएप",
      heroHeadline: "आपकी मुस्कान, भरोसेमंद हाथों में।",
      heroSubtext: "मानसरोवर, जयपुर में 9+ वर्षों से विश्वसनीय दंत एवं संपूर्ण पारिवारिक स्वास्थ्य सेवा।",
      heroBadge: "आधुनिक डेंटल एवं हेल्थ स्टूडियो",
      servicesHeading: "आपके परिवार की हर स्वास्थ्य जरूरत, एक ही छत पर।",
      servicesSubheading: "सौम्य दंत चिकित्सा से लेकर सामान्य स्वास्थ्य परामर्श तक, सभी पीढ़ियों के लिए उत्तम देखभाल।",
      servicesNote: "क्लीनिक मालिक के लिए नोट: सेवाएं एवं विवरण पूरी तरह संपादन योग्य हैं।",
      doctorsHeading: "हमारे अनुभवी चिकित्सकों से मिलें",
      doctorsSubheading: "मानसरोवर, जयपुर में 9+ वर्षों का समर्पित चिकित्सीय अनुभव।",
      whyUsHeading: "मरीज हम पर भरोसा क्यों करते हैं",
      whyUsSubheading: "स्वच्छता, दर्द-रहित उपचार और पारदर्शी परामर्श का हमारा अटूट वादा।",
      galleryHeading: "स्माइल ट्रांसफॉर्मेशन गैलरी",
      gallerySubheading: "दंत सौंदर्य और स्माइल सुधार का इंटरएक्टिव पहले और बाद का प्रदर्शन।",
      reviewsHeading: "मरीजों की राय",
      reviewsSubheading: "उन परिवारों के विचार जिनकी सेवा करने का हमें सौभाग्य प्राप्त हुआ है।",
      sampleReviewNotice: "सूचना: यह सैंपल समीक्षा कार्ड हैं जिन्हें असली मरीज फीडबैक से बदला जा सकता है।",
      formHeading: "अपॉइंटमेंट बुक करें",
      formSubheading: "डॉ. नील कमल या डॉ. गोपाल लाल सिंघल से परामर्श हेतु समय आरक्षित करें।",
      locationHeading: "मानसरोवर क्लिनिक पधारें",
      locationSubheading: "120A, श्री राम विहार A, मान्यावास, मानसरोवर, जयपुर में स्थित।",
    },
  },
};
