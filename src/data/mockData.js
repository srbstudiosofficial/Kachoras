export const COMPANY_INFO = {
  name: "KACHORAS",
  fullName: "Kachoras Electromechanical Contracting LLC",
  arabicName: "كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م",
  tagline: "20 Years of Master Construction & Electromechanical Contracting in Dubai (2006–2026)",
  establishedYear: 2006,
  phone: "04-2390946",
  intPhone: "+971 4 2390946",
  fax: "04-2582778",
  mobile: "+971-55-5585079",
  whatsapp: "+971-56-5066904",
  whatsappDisplay: "+971 56 506 6904",
  email: "kachorasdubai@gmail.com",
  secondaryEmail: "info@kachoras.com",
  poBox: "123397, Dubai, U.A.E.",
  address: "B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, U.A.E.",
  locationDisplay: "B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, U.A.E.",
  landmark: "Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1",
  licenseNumber: "578964",
  municipalityLicense: "Dubai Municipality G+1 Approved Contractor",
  dunsNumber: "561419908",
  registerNo: "2148781",
  dcciNo: "169651",
  experienceYears: 20,
  completedProjectsCount: "500+",
  activeProjectsCount: "Active 2026 Operations",
  workingHours: "Monday – Saturday: 7:00 AM – 4:00 PM | Sunday Closed (Emergency site teams on call)",
  specialties: [
    "G+1 Building Contracting (Residential & Commercial Villas/Buildings)",
    "MEP Works & Engineering (HVAC, Electrical & Plumbing)",
    "Aluminium & Glass Works (Manufacturing & Installation)",
    "Kitchen Cabinets & Wardrobes",
    "Dubai Municipality Maintenance & Civil Works"
  ]
};

export const CORE_CATEGORIES = [
  {
    id: "construction",
    title: "G+1 Licensed Construction",
    subtitle: "Complete construction services from foundations to final handover",
    icon: "Building2",
    description: "Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards. Accredited for turnkey luxury G+1 residential and commercial villas and buildings.",
    features: [
      "Soil excavation, foundation and substructure works",
      "Reinforced concrete structure and superstructure works",
      "AAC blockwork and thermal insulation as per Dubai regulations",
      "Residential villas, Majlis extensions, and boundary walls",
      "Dubai Municipality inspections, permits, and Building Completion Certificates (BCC)"
    ],
    deliverables: [],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "mep",
    title: "MEP Works & Engineering",
    subtitle: "Electrical, Plumbing & Air-Conditioning (HVAC) Works",
    icon: "Cpu",
    description: "Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning. Approved subcontractor for leading AC brands including Carrier, O General, Trane, Daikin, and Super General.",
    features: [
      "Supply, installation and maintenance of decorative split, ducted split, VRF and chiller systems",
      "Complete electrical installation, wiring, MDB/SMDB panels, testing and commissioning",
      "Complete plumbing and drainage installation, water pumps, testing and commissioning",
      "Fire alarm, smoke detection and fire sprinkler systems compliance",
      "DEWA electrical coordination and municipal approvals"
    ],
    deliverables: [],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "aluminum_glass",
    title: "Aluminium & Glass Works",
    subtitle: "Manufacturing & Installation at In-House Al Qusais Workshop",
    icon: "ShieldCheck",
    description: "Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.",
    features: [
      "Aluminium curtain walls and double-glazed windows",
      "Thermal-break aluminium doors and windows",
      "Heavy-duty sliding doors and panoramic glazing",
      "Frameless glass railings, balustrades and mirrors",
      "Aluminium pergolas, canopies, skylights and louvers"
    ],
    deliverables: [],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "maintenance",
    title: "Civil Maintenance & Fit-out Works",
    subtitle: "Building Maintenance, Renovation & Interior Finishing",
    icon: "Hammer",
    description: "Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services. Our services include decorative gypsum ceilings, custom-made kitchen cabinets, wardrobes, and general building maintenance.",
    features: [
      "Decorative gypsum ceilings, false ceilings, and ambient cove lighting",
      "Custom-made modular kitchen cabinets and wardrobes",
      "Tile, marble, porcelain flooring, waterproofing and structural crack repairs",
      "Dubai Municipality civic facilities, clinics, and public infrastructure works",
      "Annual Maintenance Contracts (AMC) and emergency repair support"
    ],
    deliverables: [],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
  }
];

export const STAFF_MEMBERS = [
  { sNo: 1, name: "Jose K. George", designation: "General Manager", phone: "+971-555585079", department: "Executive Leadership" },
  { sNo: 2, name: "Soby John", designation: "Manager", phone: "+971-555585046", department: "Operations & Management" },
  { sNo: 3, name: "Jaison Jesudasan", designation: "Accounts & HR", phone: "+971-565066901", department: "Finance & Human Resources" },
  { sNo: 4, name: "Jesudasan K.G", designation: "Sales Executive", phone: "+971-555585047", department: "Business Development" },
  { sNo: 5, name: "Faizul Shaik", designation: "Project Manager", phone: "+971-565066904", department: "Project Delivery" },
  { sNo: 6, name: "Amanullah Muhammadi Gul", designation: "Senior Engineer", phone: "+971-509954825", department: "Engineering & Technical" },
  { sNo: 7, name: "Annu", designation: "Project Co-ordinator", phone: "+971-505562350", department: "Project Coordination" }
];

export const COMPLETED_PROJECTS_VILLAS = [
  {
    id: "V-P426",
    code: "P-426",
    client: "Mr. Fareed Ali Hassan Al Zarooni",
    consultant: "Approved Engineering Consultancy",
    projectDetails: "G+1 Luxury Private Residence, Dubai",
    location: "Dubai Residential Sector",
    plotNo: "DM Approved Plot",
    type: "G+1 Luxury Villa",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p426-al-zarooni-g1-villa.jpg"
  },
  {
    id: "V-P405",
    code: "P-405",
    client: "Mr. Suad Salman Jabur Mahmood Al Kabie",
    consultant: "Premier Architectural Consultants",
    projectDetails: "Contemporary Luxury Villa, Dubai",
    location: "Dubai Residential Sector",
    plotNo: "DM Approved Plot",
    type: "Luxury Contemporary Villa",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p405-al-kabie-luxury-villa.jpg"
  },
  {
    id: "V-P384",
    code: "P-384",
    client: "Mr. Al Sayed Jaffer Al Sayed Mohd Al Sharaf",
    consultant: "Al Sharaf Engineering Consultancy",
    projectDetails: "Modern Townhouse Development on Plot No – 3342119, Dubai",
    location: "Plot No – 3342119, Dubai",
    plotNo: "3342119",
    type: "Townhouse Residence",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p384-sharaf-townhouse-plot-3342119.jpg"
  },
  {
    id: "V-P385",
    code: "P-385",
    client: "Mr. Al Sayed Jaffer Al Sayed Mohd Al Sharaf",
    consultant: "Al Sharaf Engineering Consultancy",
    projectDetails: "Modern Townhouse Development on Plot No – 3342135, Dubai",
    location: "Plot No – 3342135, Dubai",
    plotNo: "3342135",
    type: "Townhouse Residence",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p385-sharaf-townhouse-plot-3342135.jpg"
  },
  {
    id: "V-P382",
    code: "P-382",
    client: "Mr. Mohammad Abdul Hameed Yousuf Abuali",
    consultant: "Consulting Engineers Group",
    projectDetails: "4-Townhouse Residential Complex, Dubai",
    location: "Dubai",
    plotNo: "DM Approved Plot",
    type: "4-Townhouse Complex",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p382-abuali-4-townhouse.jpg"
  },
  {
    id: "V-P367",
    code: "P-367",
    client: "Mr. Ahmad Alsayed Mohd Alsyd Ibrahim Moosawi",
    consultant: "Croquis Engineering Consultancy",
    projectDetails: "G+1 Villa Architectural Facade, Dubai",
    location: "Dubai",
    plotNo: "DM Approved Plot",
    type: "G+1 Villa",
    category: "Aluminium & Glass Fabrication",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p367-moosawi-g1-villa.jpg"
  },
  {
    id: "V-P363",
    code: "P-363",
    client: "Mr. Mohamed Rashed Abdulla Al Nuaimi",
    consultant: "Engineering Consultants Dubai",
    projectDetails: "Residential Villa & Majlis, Dubai",
    location: "Dubai",
    plotNo: "DM Approved Plot",
    type: "Residential Villa",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p363-nuaimi-villa-elevation.jpg"
  },
  {
    id: "V1",
    client: "Mr. Khalifa Sebil Almas Khamis Salmin",
    consultant: "Croquis Engineering Consultancy",
    projectDetails: "Private G+1 Villa on Plot No – 4317233 at Wadi Al Shabak, Dubai",
    location: "Wadi Al Shabak, Dubai",
    plotNo: "4317233",
    type: "G+1 Villa",
    category: "Private Luxury Villas",
    status: "Completed & Handed Over",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "V2",
    client: "Mr. Abdulla Sebil Almas Khamis Salmin",
    consultant: "Croquis Engineering Consultancy",
    projectDetails: "Private G+1 Villa on Plot No – 4312137 at Wadi Al Shabak, Dubai",
    location: "Wadi Al Shabak, Dubai",
    plotNo: "4312137",
    type: "G+1 Villa",
    category: "Private Luxury Villas",
    status: "Completed & Handed Over",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "V3",
    code: "P-373",
    client: "Mr. Ahmed Khalil Ibrahim Al Sayegh",
    consultant: "Arkiplan Consulting Architects",
    projectDetails: "G+1 Villa and Service Block on Plot No – 3760253 at Al Barsha Second, Dubai",
    location: "Al Barsha Second, Dubai",
    plotNo: "3760253",
    type: "G+1 Villa + Service Block",
    category: "Building Contracting",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/p373-alsayegh-villa-2014.jpg",
    elevationImage: "./assets/real-projects/p373-alsayegh-elevation.jpg"
  },
  {
    id: "V4",
    client: "Mariam Hussain Redha Hassan Albannay",
    consultant: "Al Manhal Engineering Consultants",
    projectDetails: "G+1 Villa and Service Block on Plot No – 4247036 at Al Warqaa, Dubai",
    location: "Al Warqaa, Dubai",
    plotNo: "4247036",
    type: "G+1 Villa + Service Block",
    category: "Private Luxury Villas",
    status: "Completed & Handed Over",
    image: "./assets/real-projects/completed-construction-albannay-424-7036.jpg"
  },
  {
    id: "V5",
    client: "Khalfan Suroor Saeed Abdullah Suroor",
    consultant: "Al Majal Engineering Consultation",
    projectDetails: "G+1 Villa and Service Block on Plot No – 7113697 at Al Awir First, Dubai",
    location: "Al Awir First, Dubai",
    plotNo: "7113697",
    type: "G+1 Villa + Service Block",
    category: "Private Luxury Villas",
    status: "Completed & Handed Over",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "V6",
    client: "Wahid Rahma Abdulla Abdul Karim Al Bastaki",
    consultant: "Al Manhal Engineering Consultants",
    projectDetails: "G+1 Extension & Modifications of Villa + Service Block + Driver Room on Plot No – 6720582 at Al Barsha South 2, Dubai",
    location: "Al Barsha South 2, Dubai",
    plotNo: "6720582",
    type: "G+1 Extension + Service Block + Driver Room",
    category: "Villa Extensions",
    status: "Completed & Handed Over",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "V7",
    client: "Mr. Ahmed Abdulla Ahmed Hassan",
    consultant: "Talent Engineering Consultants",
    projectDetails: "Proposed Service Block on Plot No – 2631376 at Al Mizhar Second, Dubai",
    location: "Al Mizhar Second, Dubai",
    plotNo: "2631376",
    type: "Service Block",
    category: "Service Blocks",
    status: "Completed & Handed Over",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
  }
];

export const DUBAI_MUNICIPALITY_PROJECTS = [
  {
    id: "DM1",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Maintenance, Modifications and Construction of Veterinary clinics at various locations on Plot No – 8912682 at Hatta",
    location: "Hatta, Dubai",
    plotNo: "8912682",
    scope: "Veterinary Clinics Construction & Modifications",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM2",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Graveyard Road side Boundary wall on Plot No – 8911938 at Hatta",
    location: "Hatta, Dubai",
    plotNo: "8911938",
    scope: "Roadside Boundary Wall Civil Construction",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM3",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Maintenance, Modifications and Painting works for Public Health Pest control at Al Quoz",
    location: "Al Quoz, Dubai",
    plotNo: "Al Quoz Facility",
    scope: "Public Health Facility Maintenance & Special Painting",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM4",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Construction of New underground valve chamber for Irrigation in Shooroq- Mirdif",
    location: "Shooroq, Mirdif, Dubai",
    plotNo: "Shooroq Irrigation Hub",
    scope: "Civil Underground Valve Chamber & Hydraulic MEP",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM5",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Supply and Installation of cable conducting with poles for speakers at various locations (Safa & Mushrif Park)",
    location: "Safa Park & Mushrif Park, Dubai",
    plotNo: "Public Parks Sector",
    scope: "Electrical Cable Conduits & Speaker Mast Installation",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM6",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Construction of foundations and installation of sculpture at Al Barsha and Al Nahda pond parks",
    location: "Al Barsha & Al Nahda Pond Parks, Dubai",
    plotNo: "Pond Parks Civic Sector",
    scope: "Reinforced Concrete Foundation Pours & Public Sculptures",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "DM7",
    client: "Dubai Municipality",
    consultant: "Dubai Municipality General Maintenance Department",
    projectDetails: "Modifications, Maintenance and Painting works at Cattle Market, Al Qusais",
    location: "Al Qusais, Dubai",
    plotNo: "Cattle Market Complex",
    scope: "Modifications, Maintenance & Painting Works",
    category: "Government Civic Works",
    status: "Completed & Certified",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
  }
];

export const ONGOING_PROJECTS = [
  {
    id: "OG1",
    client: "Maha Ebrahim Mohammad Hassan Alblooshi",
    projectDetails: "Proposed Majlis Block and Modifications of villa on Plot No – 6716536 at Al Barsha South First, Dubai",
    location: "Al Barsha South First, Dubai",
    plotNo: "6716536",
    type: "Proposed Majlis Block & Villa Modification",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "OG2",
    client: "Ismail Ibrahim Mohammad Ahmad",
    projectDetails: "Proposed Majlis Block and Modifications of kitchen on Plot No – 3761835 at Al Barsha Second, Dubai",
    location: "Al Barsha Second, Dubai",
    plotNo: "3761835",
    type: "Proposed Majlis Block & Kitchen Remodel",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "OG3",
    client: "Mohammad Rafi Abdul Rahman Mohammad Sharif",
    projectDetails: "Proposed Majlis Block on Plot No – 3670958 at Umm Al Sheif, Dubai",
    location: "Umm Al Sheif, Dubai",
    plotNo: "3670958",
    type: "Proposed Majlis Block Construction",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "OG4",
    client: "Talal Malalla Mohammad Jassem",
    projectDetails: "Modifications of G+1 Villa on Plot No – 3760283 at Al Barsha Second, Dubai",
    location: "Al Barsha Second, Dubai",
    plotNo: "3760283",
    type: "G+1 Villa Structural Modifications",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "OG5",
    client: "Moosa Ebrahim Mohammad Hassan Alblooshi",
    projectDetails: "Maintenance and Modifications of G+1 Villa on Plot No – 3760283 at Al Barsha Second, Dubai",
    location: "Al Barsha Second, Dubai",
    plotNo: "3760283",
    type: "G+1 Villa Maintenance & Upgrades",
    status: "Active Execution",
    image: "./assets/real-projects/completed-construction-albannay-424-7036.jpg"
  },
  {
    id: "OG6",
    client: "Jassim Abdul Rahman Mohammad Sharif Saleh Alawadhi",
    projectDetails: "Maintenance and Modifications of Villa on Plot No – 4164036 at Nadd Al Hamar, Dubai",
    location: "Nadd Al Hamar, Dubai",
    plotNo: "4164036",
    type: "Villa Maintenance & Interior Retrofit",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "OG7",
    client: "Moaza Ahmed Nasser Al Matairi",
    projectDetails: "Maintenance and Modifications of Villa on Plot No – 325-262 at Zabeel First, Dubai",
    location: "Zabeel First, Dubai",
    plotNo: "325-262",
    type: "Villa Maintenance & Modifications",
    status: "Active Execution",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
  }
];

export const CONSULTANT_PARTNERS = [
  { name: "Gulf Engineering Consultants", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" },
  { name: "Al Majal Engineering Consultants", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" },
  { name: "Croquis Engineering Consultants", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" },
  { name: "Al Manhal Engineering Consultants", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" },
  { name: "Teamwork Engineering Consultants", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" },
  { name: "Al Bait International Architectural Design Consultancy", role: "G+1 Villas, Building Maintenance and MEP works", location: "Dubai, UAE" }
];

export const UAE_ESTIMATOR_CONFIG = {
  currency: "AED",
  sectors: [
    { id: "g1_villa", label: "New G+1 Custom Villa Construction", ratePerSqFt: 385, desc: "Dubai Municipality approved G+1 turnkey construction with MEP, structural concrete, and quality finishes." },
    { id: "majlis_block", label: "Majlis Block & Service Quarter", ratePerSqFt: 325, desc: "Standalone luxury Majlis structure with heritage gypsum, luxury lighting, and private washrooms." },
    { id: "villa_extension", label: "Villa Extension & Modifications", ratePerSqFt: 295, desc: "Structural expansions, driver rooms, kitchen additions, and layout reconfiguration." },
    { id: "mep_fitout", label: "Complete MEP & HVAC Overhaul", ratePerSqFt: 145, desc: "DEWA approved electrical distribution, high-efficiency ducted AC, plumbing and drainage." },
    { id: "aluminum_glass", label: "Aluminium & Glass Architectural Package", ratePerSqFt: 185, desc: "Thermal-break aluminium framing, double glazed sliding doors, curtain walls, and safety balustrades." }
  ],
  finishes: [
    { id: "standard", label: "Standard Quality Finish", multiplier: 1.0, desc: "High quality UAE municipality approved specifications and standard ceramic/marble." },
    { id: "premium", label: "Executive Luxury Finish", multiplier: 1.25, desc: "Custom decorative gypsum ceilings, upgraded porcelain/granite, and premium sanitary fittings." },
    { id: "royal", label: "VIP / Custom Bespoke Finish", multiplier: 1.60, desc: "Imported Italian marble, intricate GRC facades, smart automation, and artisan joinery." }
  ],
  addons: [
    { id: "dm_permits", label: "Dubai Municipality & Civil Defense Permitting Expediting", cost: 15000 },
    { id: "grc_facade", label: "Decorative GRC External Architectural Cladding", cost: 25000 },
    { id: "gypsum_art", label: "Bespoke Classical Gypsum Ceiling & Cornice Sculpting", cost: 18000 },
    { id: "cabinetry", label: "Custom Kitchen Cabinetry & Built-in Wardrobes", cost: 22000 }
  ]
};
