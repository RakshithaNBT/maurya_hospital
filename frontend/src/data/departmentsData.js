import deptGeneralMedicine from '../assets/dept_general_medicine.png';
import deptGynaecology from '../assets/dept_gynaecology.png';
import deptOrthopedic from '../assets/dept_orthopedic.png';
import deptPaediatric from '../assets/dept_paediatric.png';
import deptGeneralSurgery from '../assets/dept_general_surgery.png';
import deptGastroenterology from '../assets/dept_gastroenterology.png';
import deptPulmonology from '../assets/dept_pulmonology.png';
import deptCardiology from '../assets/dept_cardiology.png';
import deptUrology from '../assets/dept_urology.png';
import deptNeurology from '../assets/dept_neurology.png';
import hospitalEmergencyEntrance from '../assets/hospital_emergency_entrance.jpg';
import deptNeuroAndSpine from '../assets/dept_neuro and spine surgery.png';
import deptPlasticSurgery from '../assets/dept_Plastic and Reconstructive Surgery.png';
import deptEnt from '../assets/dept_ent (ear, nose, and throat).png';
import deptOncology from '../assets/dept_oncology.png';
import deptDermatology from '../assets/dept_dermatology.png';

export const departmentsData = [
  {
    DepartmentId: 5,
    slug: 'general-medicine',
    DepartmentName: 'General Medicine',
    subtitle: 'Comprehensive Care for Adult Medical Conditions',
    Description: 'Diagnosis, management, and prevention of complex adult medical conditions and metabolic disorders.',
    fullDescription: 'General Medicine forms the foundation of clinical care at Maurya Hospital. Our team of experienced physicians specializes in diagnosing, treating, and preventing a wide spectrum of adult medical conditions. We provide holistic care for chronic diseases, metabolic disorders, and complex multi-system illnesses.',
    Image: deptGeneralMedicine,
    keyServices: [
      'Diabetes & Metabolic Management',
      'Hypertension & Cardiovascular Risk',
      'Infectious Disease Treatment',
      'Respiratory & Asthmatic Care',
      'Preventive Health Check-ups'
    ],
    doctors: [
      { name: 'Dr. S. K. Gupta', role: 'Senior Consultant Physician' },
      { name: 'Dr. Neha Sharma', role: 'Internal Medicine Specialist' }
    ],
    facilities: [
      'Comprehensive Diagnostic Lab',
      'Dedicated Outpatient Clinics',
      'In-patient Ward Care'
    ],
    faqs: [
      { question: 'Do I need a referral to see a general physician?', answer: 'No, you can directly book an appointment with our general physicians for primary care and initial diagnosis.' }
    ]
  },
  {
    DepartmentId: 1,
    slug: 'emergency-critical-care',
    DepartmentName: 'Emergency and Critical Care',
    subtitle: 'Rapid Response and Life-Saving Trauma Care',
    Description: '24/7 rapid trauma response, emergency medicine, and critical care units staffed by expert physicians.',
    fullDescription: 'Our Emergency and Critical Care department operates round the clock to provide immediate, life-saving interventions for patients facing acute medical crises. Equipped with advanced resuscitation bays, dedicated trauma suites, and a highly specialized multidisciplinary team, we are fully prepared to handle all types of medical and surgical emergencies with speed and precision.',
    Image: hospitalEmergencyEntrance,
    keyServices: [
      '24/7 Trauma Care Center',
      'Advanced Cardiac Life Support (ACLS)',
      'Intensive Care Unit (ICU) Management',
      'Stroke Emergency Response',
      'Poisoning & Toxicology Management'
    ],
    doctors: [
      { name: 'Dr. Ramesh Kumar', role: 'Head of Emergency Medicine' },
      { name: 'Dr. Anita Desai', role: 'Critical Care Specialist' }
    ],
    facilities: [
      'Level-1 Trauma Bays',
      'Ventilator-equipped ICU Beds',
      'Dedicated Emergency Operation Theater',
      '24-hour Diagnostic & Imaging Support'
    ],
    faqs: [
      { question: 'What should I do in a medical emergency?', answer: 'Call our emergency hotline immediately or bring the patient directly to our ER entrance, open 24/7.' },
      { question: 'Do you have an ambulance service?', answer: 'Yes, we provide fully-equipped ALS and BLS ambulance services for immediate medical transport.' }
    ]
  },
  {
    DepartmentId: 2,
    slug: 'neuro-spine-surgery',
    DepartmentName: 'Neuro and Spine Surgery',
    subtitle: 'Advanced Surgical Solutions for Brain & Spine',
    Description: 'Advanced surgical treatments for brain and spine disorders, complex neuro-trauma, and nerve injuries.',
    fullDescription: 'The Neuro and Spine Surgery department at Maurya Hospital offers cutting-edge surgical and minimally invasive treatments for a wide spectrum of neurological disorders. Our highly skilled neurosurgeons utilize state-of-the-art neuro-navigation and microscopic techniques to ensure the highest safety and precision for procedures involving the brain, spinal cord, and peripheral nerves.',
    Image: deptNeuroAndSpine,
    keyServices: [
      'Micro-Neurosurgery for Brain Tumors',
      'Spinal Fusion & Disc Replacement',
      'Minimally Invasive Spine Surgery (MISS)',
      'Traumatic Brain Injury Management',
      'Endoscopic Skull Base Surgery'
    ],
    doctors: [
      { name: 'Dr. Vikram Sharma', role: 'Senior Neurosurgeon' },
      { name: 'Dr. Priya Menon', role: 'Spine Surgery Specialist' }
    ],
    facilities: [
      'Neuro-Navigation System',
      'Operating Microscopes',
      'Dedicated Neuro-ICU',
      'Advanced MRI and CT Diagnostics'
    ],
    faqs: [
      { question: 'How long is the recovery from spine surgery?', answer: 'Recovery times vary depending on the procedure. Minimally invasive surgeries often allow patients to walk the same day, while complex fusions may require several weeks.' },
      { question: 'Is neurosurgery always open surgery?', answer: 'No, many of our procedures use minimally invasive or endoscopic techniques, resulting in smaller incisions and faster recovery.' }
    ]
  },
  {
    DepartmentId: 3,
    slug: 'orthopaedics',
    DepartmentName: 'Orthopaedics',
    subtitle: 'Comprehensive Bone, Joint & Musculoskeletal Care',
    Description: 'Comprehensive joint replacements, arthroscopic surgery, fracture treatment, and musculoskeletal care.',
    fullDescription: 'Our Orthopaedics department is dedicated to restoring mobility and alleviating pain for patients with bone, joint, and muscle conditions. From complex joint replacements to sports injuries and trauma care, our expert orthopaedic surgeons use the latest techniques to ensure optimal recovery and improved quality of life.',
    Image: deptOrthopedic,
    keyServices: [
      'Total Knee & Hip Replacements',
      'Arthroscopic Surgery (Sports Medicine)',
      'Complex Fracture Management',
      'Spine Orthopaedics',
      'Paediatric Orthopaedics'
    ],
    doctors: [
      { name: 'Dr. Sunil Patil', role: 'Joint Replacement Surgeon' },
      { name: 'Dr. Arjun Reddy', role: 'Sports Medicine Specialist' }
    ],
    facilities: [
      'Class 100 Modular Operation Theaters',
      'Advanced C-Arm Systems',
      'Dedicated Physiotherapy & Rehab Center'
    ],
    faqs: [
      { question: 'When is a joint replacement recommended?', answer: 'It is typically recommended when joint pain severely limits daily activities and conservative treatments (medications, physical therapy) no longer provide relief.' },
      { question: 'Do you offer physical therapy post-surgery?', answer: 'Yes, we have a fully equipped in-house physiotherapy department to assist with your rehabilitation.' }
    ]
  },
  {
    DepartmentId: 4,
    slug: 'plastic-reconstructive-surgery',
    DepartmentName: 'Plastic and Reconstructive Surgery',
    subtitle: 'Restoring Form, Function, and Confidence',
    Description: 'Restorative, reconstructive, and aesthetic surgical procedures using advanced clinical techniques.',
    fullDescription: 'The Plastic and Reconstructive Surgery department provides comprehensive restorative treatments ranging from complex trauma reconstruction to aesthetic enhancements. Our skilled surgeons prioritize patient safety, employing advanced micro-surgical techniques to restore function and improve aesthetic outcomes with natural-looking results.',
    Image: deptPlasticSurgery,
    keyServices: [
      'Post-Trauma Reconstruction',
      'Burn Care & Skin Grafting',
      'Craniofacial Surgery',
      'Aesthetic & Cosmetic Procedures',
      'Hand & Micro-vascular Surgery'
    ],
    doctors: [
      { name: 'Dr. Meena Iyer', role: 'Reconstructive Surgeon' },
      { name: 'Dr. Kabir Das', role: 'Cosmetic Surgeon' }
    ],
    facilities: [
      'Specialized Burn Unit',
      'Micro-Surgical Equipment',
      'Advanced Laser Therapy Tools'
    ],
    faqs: [
      { question: 'Is reconstructive surgery covered by insurance?', answer: 'Many reconstructive surgeries (e.g., post-trauma, burn care) are covered by insurance. Aesthetic procedures typically are not. Please consult our billing desk for specifics.' }
    ]
  },
  {
    DepartmentId: 6,
    slug: 'general-surgery',
    DepartmentName: 'General Surgery',
    subtitle: 'Advanced Open and Laparoscopic Surgical Care',
    Description: 'Advanced open and laparoscopic surgical options for abdominal conditions, hernia repair, and trauma.',
    fullDescription: 'The General Surgery department offers a wide array of surgical interventions. Emphasizing minimally invasive techniques (laparoscopy), our surgeons routinely treat abdominal, gastrointestinal, and endocrine conditions. Our focus is on minimizing pain, reducing hospital stays, and ensuring swift patient recovery.',
    Image: deptGeneralSurgery,
    keyServices: [
      'Laparoscopic Gallbladder Removal (Cholecystectomy)',
      'Hernia Repair (Open and Laparoscopic)',
      'Appendectomy',
      'Thyroid & Endocrine Surgery',
      'Colorectal Surgery'
    ],
    doctors: [
      { name: 'Dr. Prakash Rao', role: 'Senior General & Laparoscopic Surgeon' },
      { name: 'Dr. Vivek Singh', role: 'Consultant Surgeon' }
    ],
    facilities: [
      'Modular Operation Theaters',
      'Advanced Laparoscopic Towers',
      'Post-Operative Recovery Suites'
    ],
    faqs: [
      { question: 'What are the benefits of laparoscopic surgery?', answer: 'Laparoscopic surgery typically results in smaller incisions, less post-operative pain, shorter hospital stays, and a quicker return to normal activities.' }
    ]
  },
  {
    DepartmentId: 7,
    slug: 'obstetrics-gynaecology',
    DepartmentName: 'Obstetrics and Gynaecology',
    subtitle: 'Comprehensive Healthcare for Women',
    Description: 'Comprehensive women\'s healthcare, pre and post-natal care, normal and high-risk pregnancy deliveries.',
    fullDescription: 'Our Obstetrics and Gynaecology department is dedicated to providing compassionate, comprehensive care for women at every stage of life. From adolescent health and routine check-ups to managing high-risk pregnancies and complex gynaecological surgeries, our expert team ensures the highest standard of maternal and female care.',
    Image: deptGynaecology,
    keyServices: [
      'Maternity Services (Normal & C-Section)',
      'High-Risk Pregnancy Management',
      'Laparoscopic Gynaecological Surgeries',
      'Infertility Evaluation & Treatment',
      'Menopause Clinic'
    ],
    doctors: [
      { name: 'Dr. Lakshmi Narayanan', role: 'Senior Obstetrician & Gynaecologist' },
      { name: 'Dr. Sneha Patil', role: 'Fetal Medicine Specialist' }
    ],
    facilities: [
      'State-of-the-Art Labor and Delivery Suites',
      'Neonatal Intensive Care Unit (NICU)',
      'Advanced 3D/4D Ultrasound'
    ],
    faqs: [
      { question: 'Do you offer painless delivery options?', answer: 'Yes, we provide epidural analgesia and other pain management options for labor, administered by expert anesthesiologists.' }
    ]
  },
  {
    DepartmentId: 8,
    slug: 'paediatrics',
    DepartmentName: 'Paediatrics',
    subtitle: 'Compassionate Care for Children and Adolescents',
    Description: 'Compassionate healthcare services for newborns, infants, children, and adolescents, including immunizations.',
    fullDescription: 'The Paediatrics department at Maurya Hospital provides specialized care for children ranging from newborns to adolescents. Understanding that children are not just small adults, our paediatricians offer gentle, family-centered care for acute illnesses, chronic conditions, and developmental milestones.',
    Image: deptPaediatric,
    keyServices: [
      'Newborn & Premature Baby Care (NICU)',
      'Childhood Immunization & Vaccination',
      'Paediatric Asthma & Allergy Management',
      'Nutritional & Growth Counseling',
      'Paediatric Infectious Diseases'
    ],
    doctors: [
      { name: 'Dr. Anand Kumar', role: 'Senior Paediatrician' },
      { name: 'Dr. Kavita Raj', role: 'Neonatologist' }
    ],
    facilities: [
      'Child-Friendly OPDs',
      'Advanced Neonatal ICU (NICU)',
      'Paediatric Ward with Play Area'
    ],
    faqs: [
      { question: 'Is the NICU equipped for premature babies?', answer: 'Yes, our Level III NICU is fully equipped with advanced incubators and ventilators to support highly premature and critically ill newborns.' }
    ]
  },
  {
    DepartmentId: 9,
    slug: 'neurology',
    DepartmentName: 'Neurology',
    subtitle: 'Expert Management of Brain and Nerve Disorders',
    Description: 'Expert non-surgical management of complex brain, nerve, and neuromuscular disorders, epilepsy, and stroke.',
    fullDescription: 'Our Neurology department provides comprehensive diagnostic and therapeutic services for a wide range of neurological conditions. Our expert neurologists specialize in the non-surgical management of stroke, epilepsy, movement disorders, and neuro-degenerative diseases, utilizing advanced diagnostic tools to formulate precise treatment plans.',
    Image: deptNeurology,
    keyServices: [
      'Stroke Management & Rehabilitation',
      'Epilepsy Clinic & EEG Monitoring',
      'Movement Disorders & Parkinson’s Care',
      'Headache & Migraine Management',
      'Neuromuscular Disorders'
    ],
    doctors: [
      { name: 'Dr. Ravi Shankar', role: 'Senior Consultant Neurologist' },
      { name: 'Dr. Aditi Verma', role: 'Stroke Specialist' }
    ],
    facilities: [
      'Video EEG and EMG/NCV Lab',
      'Dedicated Stroke Unit',
      'Neuro-Rehabilitation Center'
    ],
    faqs: [
      { question: 'What are the early signs of a stroke?', answer: 'Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency. Immediate medical attention is crucial.' }
    ]
  },
  {
    DepartmentId: 10,
    slug: 'cardiology',
    DepartmentName: 'Cardiology',
    subtitle: 'State-of-the-art Cardiovascular Diagnostics and Care',
    Description: 'State-of-the-art cardiovascular diagnostics, disease prevention strategies, and long-term management of cardiac conditions.',
    fullDescription: 'The Cardiology department at Maurya Hospital is committed to delivering world-class heart care. We offer a full spectrum of cardiovascular services ranging from preventive cardiology and non-invasive diagnostics to complex interventional procedures. Our dedicated team of cardiologists ensures rapid response for heart emergencies and personalized care for chronic conditions.',
    Image: deptCardiology,
    keyServices: [
      'Coronary Angiography & Angioplasty',
      'Echocardiography (2D/3D & TEE)',
      'Pacemaker Implantation',
      'Heart Failure Management',
      'Preventive Cardiac Health Check-ups'
    ],
    doctors: [
      { name: 'Dr. Mahesh Babu', role: 'Chief Interventional Cardiologist' },
      { name: 'Dr. Shalini Rao', role: 'Consultant Cardiologist' }
    ],
    facilities: [
      'Advanced Cath Lab',
      'Coronary Care Unit (CCU)',
      'TMT (Treadmill Test) & Holter Monitoring'
    ],
    faqs: [
      { question: 'What does an angiogram involve?', answer: 'An angiogram is an X-ray imaging test done using a special dye and camera (fluoroscopy) to take pictures of the blood flow in an artery or a vein.' }
    ]
  },
  {
    DepartmentId: 11,
    slug: 'gastroenterology',
    DepartmentName: 'Gastroenterology',
    subtitle: 'Comprehensive Care for Digestive Health',
    Description: 'Diagnosis and therapeutic treatments for digestive, pancreatic, liver, and biliary tract conditions.',
    fullDescription: 'The Gastroenterology department offers expert diagnosis and management for all disorders of the digestive system, including the liver, pancreas, and biliary tract. We utilize advanced endoscopic techniques for both diagnostic evaluation and therapeutic intervention, ensuring minimally invasive and highly effective treatment.',
    Image: deptGastroenterology,
    keyServices: [
      'Diagnostic & Therapeutic Endoscopy',
      'Colonoscopy & Polypectomy',
      'Liver Disease & Hepatitis Management',
      'Inflammatory Bowel Disease (IBD) Care',
      'ERCP for Biliary & Pancreatic Stones'
    ],
    doctors: [
      { name: 'Dr. Sanjay Gupta', role: 'Senior Gastroenterologist' },
      { name: 'Dr. Amit Trivedi', role: 'Hepatologist & Endoscopist' }
    ],
    facilities: [
      'State-of-the-art Endoscopy Suites',
      'High-Definition Video Endoscopes',
      'FibroScan for Liver Evaluation'
    ],
    faqs: [
      { question: 'Is an endoscopy painful?', answer: 'Endoscopy is generally not painful. It is performed under conscious sedation or local anesthesia to ensure your comfort throughout the procedure.' }
    ]
  },
  {
    DepartmentId: 12,
    slug: 'ent',
    DepartmentName: 'ENT (Ear, Nose, and Throat)',
    subtitle: 'Specialized Head, Neck, and ENT Care',
    Description: 'Specialized treatment for disorders of the ear, nose, throat, head, and neck regions.',
    fullDescription: 'Our ENT department provides comprehensive medical and surgical care for patients with conditions affecting the ear, nose, throat, and structures of the head and neck. We leverage advanced micro-surgical and endoscopic technologies to treat a wide array of ailments from hearing loss and sinusitis to complex head and neck tumors.',
    Image: deptEnt,
    keyServices: [
      'Micro Ear Surgery (Tympanoplasty)',
      'Functional Endoscopic Sinus Surgery (FESS)',
      'Tonsillectomy & Adenoidectomy',
      'Voice & Swallowing Disorders',
      'Hearing Tests & Audiometry'
    ],
    doctors: [
      { name: 'Dr. Rajesh Nair', role: 'Senior ENT Surgeon' },
      { name: 'Dr. Pooja Menon', role: 'Audiologist & Speech Therapist' }
    ],
    facilities: [
      'Endoscopic Diagnostic Systems',
      'Soundproof Audiometry Booth',
      'Microscopic Surgery Equipment'
    ],
    faqs: [
      { question: 'What is FESS?', answer: 'FESS (Functional Endoscopic Sinus Surgery) is a minimally invasive surgical procedure used to treat severe sinus issues and remove polyps, improving nasal breathing.' }
    ]
  },
  {
    DepartmentId: 13,
    slug: 'urology',
    DepartmentName: 'Urology',
    subtitle: 'Advanced Urological & Men’s Health Services',
    Description: 'Comprehensive treatments for kidney stones, urinary tract infections, prostate wellness, and other urological conditions.',
    fullDescription: 'The Urology department specializes in the diagnosis and treatment of conditions affecting the male and female urinary tract, as well as the male reproductive organs. We offer advanced minimally invasive treatments for kidney stones, prostate enlargement, and urological cancers, ensuring rapid recovery and optimal patient comfort.',
    Image: deptUrology,
    keyServices: [
      'Laser Lithotripsy for Kidney Stones',
      'TURP/Laser Surgery for Prostate Enlargement',
      'Uro-Oncology (Kidney, Prostate, Bladder Cancer)',
      'Treatment for Urinary Incontinence',
      'Male Infertility & Andrology'
    ],
    doctors: [
      { name: 'Dr. V. K. Sharma', role: 'Consultant Urologist' },
      { name: 'Dr. Harish Kumar', role: 'Uro-Oncologist' }
    ],
    facilities: [
      'Advanced Holmium Laser System',
      'Urodynamic Testing Center',
      'ESWL (Lithotripsy) Machine'
    ],
    faqs: [
      { question: 'What is the recovery time for laser kidney stone surgery?', answer: 'Laser surgery for kidney stones is minimally invasive. Most patients go home within 24 hours and resume normal activities in a few days.' }
    ]
  },
  {
    DepartmentId: 14,
    slug: 'oncology',
    DepartmentName: 'Oncology',
    subtitle: 'Compassionate and Comprehensive Cancer Care',
    Description: 'Early cancer detection, screening, tumor diagnostics, and holistic support services.',
    fullDescription: 'Maurya Hospital’s Oncology department is dedicated to providing holistic, multidisciplinary cancer care. From early screening and precise diagnosis to advanced chemotherapy, surgical oncology, and palliative care, we support our patients and their families through every step of their cancer journey with compassion and clinical excellence.',
    Image: deptOncology,
    keyServices: [
      'Medical Oncology (Chemotherapy & Immunotherapy)',
      'Surgical Oncology (Tumor Resections)',
      'Cancer Screening & Preventive Checkups',
      'Pain Management & Palliative Care',
      'Onco-Psychology & Nutrition Counseling'
    ],
    doctors: [
      { name: 'Dr. Arvind Desai', role: 'Medical Oncologist' },
      { name: 'Dr. Sunita Reddy', role: 'Surgical Oncologist' }
    ],
    facilities: [
      'Dedicated Chemotherapy Daycare Center',
      'Advanced Diagnostic Imaging (PET-CT referrals)',
      'Tumor Board Multi-speciality Discussions'
    ],
    faqs: [
      { question: 'What support services do you offer for cancer patients?', answer: 'We offer a holistic approach including psychological counseling, specialized nutritional guidance, and pain management to support overall well-being.' }
    ]
  },
  {
    DepartmentId: 15,
    slug: 'dermatology',
    DepartmentName: 'Dermatology',
    subtitle: 'Advanced Skin, Hair, and Aesthetic Treatments',
    Description: 'Comprehensive diagnosis and treatment for skin, hair, nail disorders, and cosmetic concerns.',
    fullDescription: 'Our Dermatology department offers specialized care for a vast array of skin, hair, and nail conditions. Utilizing the latest medical and cosmetic technologies, our dermatologists provide tailored treatments for clinical conditions like psoriasis and eczema, as well as advanced aesthetic procedures for skin rejuvenation and anti-aging.',
    Image: deptDermatology,
    keyServices: [
      'Acne & Scar Treatment',
      'Laser Hair Reduction & Skin Resurfacing',
      'Management of Eczema, Psoriasis & Vitiligo',
      'Hair Fall Treatments (PRP therapy)',
      'Dermatosurgery (Mole & Wart Removal)'
    ],
    doctors: [
      { name: 'Dr. Ananya Rao', role: 'Consultant Dermatologist' },
      { name: 'Dr. Shilpa Shetty', role: 'Cosmetologist' }
    ],
    facilities: [
      'Advanced Aesthetic Lasers',
      'Phototherapy Cabinets',
      'Dedicated Dermatosurgery Procedure Room'
    ],
    faqs: [
      { question: 'Are aesthetic laser procedures safe?', answer: 'Yes, all our laser treatments are FDA-approved and performed by trained dermatologists to ensure maximum safety and efficacy.' }
    ]
  }
];
