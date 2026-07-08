import otRoomImg from '../assets/ot_room.jpg';
import otCarmImg from '../assets/ot_carm.jpg';
import anesthesiaImg from '../assets/anesthesia_machine.jpg';
import otSupplyImg from '../assets/ot_shelving.jpg';
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
import deptNeuroAndSpine from '../assets/dept_neuro and spine surgery.png';
import deptPlasticSurgery from '../assets/dept_Plastic and Reconstructive Surgery.png';
import deptEnt from '../assets/dept_ent (ear, nose, and throat).png';
import deptOncology from '../assets/dept_oncology.png';
import deptDermatology from '../assets/dept_dermatology.png';
import doctorBhavana from '../assets/doctor_bhavana.jpg';
import doctorAnudeep from '../assets/doctor_anudeep.jpg';
import ctScanner from '../assets/ct_scanner.jpg';
import ctControlRoom from '../assets/ct_control_room.jpg';
import labSysmex from '../assets/lab_sysmex.jpg';
import labGem3500 from '../assets/lab_gem3500.jpg';
import labSensaCore from '../assets/lab_sensacore.jpg';
import hospitalNursingStation from '../assets/hospital_nursing_station.jpg';
import hospitalPharma from '../assets/hospital_pharma.png';
import hospitalCorridor from '../assets/hospital_corridor.jpg';
import hospitalEmergencyEntrance from '../assets/hospital_emergency_entrance.jpg';
import icuWard from '../assets/icu_ward.jpg';
import mobileXray from '../assets/facility_digital_xray.png';
import drPlate from '../assets/dr_plate.jpg';
import autoclave from '../assets/autoclave.jpg';
import otRoomNew from '../assets/ot_room_new.jpg';
import otCarmNew from '../assets/ot_carm_new.jpg';
import xrayChestStand from '../assets/xray_chest_stand.jpg';
import hospitalBuilding from '../assets/hospital_building.jpg';
import hospitalSignboard from '../assets/hospital_entrance.png';
import hospitalEntrance from '../assets/hospital_entrance.png';
import multiSliceImage from '../assets/multi_slice_advanced_ct_imaging.png';
import facilityUltrasound from '../assets/facility_ultrasound.png';
import facilityXrayOt from '../assets/facility_xray_ot.png';
import facilityDialysis from '../assets/facility_dialysis.png';
import facilityLaboratory from '../assets/facility_laboratory.png';
import facilityDaycare from '../assets/facility_daycare.png';


// Initial Seed Data
const DEFAULT_CONTENT = {
  hospital_name: 'Maurya Hospital',
  parent_company: 'Anagha Healthcare',
  welcome_title: 'Welcome to Maurya Hospital',
  welcome_text: 'Maurya Hospital, managed by Anagha Healthcare, is a premier multi-specialty healthcare institution in Mysuru, Karnataka. We are dedicated to providing compassionate, state-of-the-art medical services at affordable rates. Our highly experienced clinical team, modern diagnostic facilities (including round-the-clock CT imaging), and advanced operating systems ensure you receive the finest treatment possible.',
  stats_beds: '100+',
  stats_doctors: '25+',
  stats_staff: '150+',
  stats_patients_served: '10,000+'
};

const DEFAULT_DEPARTMENTS = [
  {
    DepartmentId: '5',
    DepartmentName: 'General Medicine',
    Description: 'Diagnosis, management, and prevention of complex adult medical conditions and metabolic disorders.',
    Image: deptGeneralMedicine
  },
  {
    DepartmentId: '1',
    DepartmentName: 'Emergency and Critical Care',
    Description: '24/7 rapid trauma response, emergency medicine, and critical care units staffed by expert physicians.',
    Image: hospitalEmergencyEntrance
  },
  {
    DepartmentId: '2',
    DepartmentName: 'Neuro and Spine Surgery',
    Description: 'Advanced surgical treatments for brain and spine disorders, complex neuro-trauma, and nerve injuries.',
    Image: deptNeuroAndSpine
  },
  {
    DepartmentId: '3',
    DepartmentName: 'Orthopaedics',
    Description: 'Comprehensive joint replacements, arthroscopic surgery, fracture treatment, and musculoskeletal care.',
    Image: deptOrthopedic
  },
  {
    DepartmentId: '4',
    DepartmentName: 'Plastic and Reconstructive Surgery',
    Description: 'Restorative, reconstructive, and aesthetic surgical procedures using advanced clinical techniques.',
    Image: deptPlasticSurgery
  },
  {
    DepartmentId: '6',
    DepartmentName: 'General Surgery',
    Description: 'Advanced open and laparoscopic surgical options for abdominal conditions, hernia repair, and trauma.',
    Image: deptGeneralSurgery
  },
  {
    DepartmentId: '7',
    DepartmentName: 'Obstetrics and Gynaecology',
    Description: 'Comprehensive women\'s healthcare, pre and post-natal care, normal and high-risk pregnancy deliveries.',
    Image: deptGynaecology
  },
  {
    DepartmentId: '8',
    DepartmentName: 'Paediatrics',
    Description: 'Compassionate medical care for infants, children, and adolescents, including immunisations and developmental monitoring.',
    Image: deptPaediatric
  },
  {
    DepartmentId: '9',
    DepartmentName: 'ENT',
    Description: 'Diagnosis and medical/surgical treatment of ear, nose, throat, head, and neck disorders.',
    Image: deptEnt
  },
  {
    DepartmentId: '10',
    DepartmentName: 'Pulmonology',
    Description: 'Care for asthma, COPD, lung infections, sleep apnea, and other respiratory disorders.',
    Image: deptPulmonology
  },
  {
    DepartmentId: '11',
    DepartmentName: 'Cardiology',
    Description: 'Expert cardiac care, diagnostics, hypertension management, and preventative heart wellness.',
    Image: deptCardiology
  },
  {
    DepartmentId: '12',
    DepartmentName: 'Neurology',
    Description: 'Medical management of stroke, epilepsy, migraines, neuropathies, and neurological health.',
    Image: deptNeurology
  },
  {
    DepartmentId: '13',
    DepartmentName: 'Urology',
    Description: 'Comprehensive treatments for kidney stones, urinary tract infections, prostate wellness, and other urological conditions.',
    Image: deptUrology
  },
  {
    DepartmentId: '14',
    DepartmentName: 'Oncology',
    Description: 'Early cancer detection, screening, tumor diagnostics, and holistic support services.',
    Image: deptOncology
  },
  {
    DepartmentId: '15',
    DepartmentName: 'Dermatology',
    Description: 'Comprehensive diagnosis and treatment for skin, hair, nail disorders, and cosmetic concerns.',
    Image: deptDermatology
  }
];

const DEFAULT_FACILITIES = [
  {
    FacilityId: '4',
    Name: 'ULTRASOUND SCAN',
    Description: 'Advanced high-resolution ultrasound imaging for diagnostic precision in abdomen, obstetrics, and vascular studies.',
    Image: facilityUltrasound
  },
  {
    FacilityId: '5',
    Name: 'Digital X-Ray',
    Description: 'High-frequency digital radiography generating clean skeletal, orthotic, and thoracic imagery with minimal exposure.',
    Image: mobileXray
  },
  {
    FacilityId: '3',
    Name: 'Laboratory Services',
    Description: 'Advanced pathology and biochemistry laboratory providing rapid diagnosis and fully automated testing services.',
    Image: facilityLaboratory
  },
  {
    FacilityId: '1',
    Name: 'Modular Operation Theatre',
    Description: 'State-of-the-art laminar flow operating theatres equipped with modern anesthesia workstations and high-definition endoscopes.',
    Image: facilityXrayOt
  },
  {
    FacilityId: '2',
    Name: 'ICU Facility',
    Description: 'High-dependency chambers with 24/7 cardiac monitoring, bedside ventilators, and highly specialized critical care nursing staff.',
    Image: icuWard
  },
  {
    FacilityId: '6',
    Name: 'Day Care Procedures',
    Description: 'Efficient and convenient same-day diagnostic and therapeutic medical/surgical procedures without requiring overnight stay.',
    Image: facilityDaycare
  },
  {
    FacilityId: '7',
    Name: 'Dialysis',
    Description: 'Modern hemodialysis unit providing safe, comfortable, and sterile treatment for patients with chronic renal conditions.',
    Image: facilityDialysis
  }
];

const DEFAULT_DOCTORS = [
  {
    DoctorId: '1',
    Name: 'DR. BHAVANA BHAGVATH.K',
    Qualification: 'MBBS, MD (Internal Medicine) DNB (Internal Medicine)',
    Specialization: 'Consultant General Physician',
    Experience: '12 Years',
    Image: doctorBhavana,
    Description: 'Dr. Bhavana Bhagvath K is a highly experienced Consultant General Physician dedicated to comprehensive adult patient care. Her clinical expertise covers advanced internal medicine, chronic disease management (diabetes, hypertension), lifestyle disorder diagnostics, and preventative care counsel. She prioritizes evidence-based diagnostic protocols and personalized patient wellness.'
  },
  {
    DoctorId: '3',
    Name: 'DR. Anudeep Talagavadi Channaiah',
    Qualification: 'MBBS, MS (GENERAL SURGERY), MCH. DRNB (PLASTIC AND RECONSTRUCTIVE SURGERY)',
    Specialization: 'Plastic Reconstructive and Cosmetic Surgery',
    Experience: '10 Years',
    Image: doctorAnudeep,
    Description: 'Dr. Anudeep Talagavadi Channaiah is a distinguished Plastic & Reconstructive Surgeon specialized in cosmetic procedures, microsurgery, hand reconstructive procedures, burn surgeries, and cosmetic enhancements. With comprehensive clinical training in both General Surgery and Plastic Surgery, he is committed to delivering state-of-the-art surgical care with absolute precision.'
  }
];

const DEFAULT_GALLERY = [
  {
    GalleryId: '2',
    Title: 'CT Siemens Somatom Scope Scanner',
    Category: 'CT Scan',
    ImagePath: ctScanner
  },
  {
    GalleryId: '3',
    Title: 'Advanced C-Arm Operating Theatre',
    Category: 'Infrastructure',
    ImagePath: otCarmNew
  },
  {
    GalleryId: '4',
    Title: 'GE Anesthesia Workstation',
    Category: 'Infrastructure',
    ImagePath: anesthesiaImg
  },
  {
    GalleryId: '5',
    Title: 'CT Control Room Console',
    Category: 'CT Scan',
    ImagePath: ctControlRoom
  },
  {
    GalleryId: '6',
    Title: 'Sysmex XN-330 Hematology Analyzer',
    Category: 'Infrastructure',
    ImagePath: labSysmex
  },
  {
    GalleryId: '7',
    Title: 'GEM Premier 3500 Blood Gas Analyzer',
    Category: 'Infrastructure',
    ImagePath: labGem3500
  },
  {
    GalleryId: '8',
    Title: 'Sensa Core ST-200 Electrolyte Analyzer',
    Category: 'Infrastructure',
    ImagePath: labSensaCore
  },
  {
    GalleryId: '9',
    Title: 'Surgical Supply Unit',
    Category: 'Infrastructure',
    ImagePath: otSupplyImg
  },
  {
    GalleryId: '10',
    Title: 'Emergency 24x7 Entrance',
    Category: 'Hospital',
    ImagePath: hospitalEmergencyEntrance
  },
  {
    GalleryId: '11',
    Title: 'Nursing Station',
    Category: 'Hospital',
    ImagePath: hospitalNursingStation
  },
  {
    GalleryId: '12',
    Title: 'Maurya Pharma Pharmacy Counter',
    Category: 'Hospital',
    ImagePath: hospitalPharma
  },
  {
    GalleryId: '13',
    Title: 'Outpatient Corridor & Waiting Area',
    Category: 'Hospital',
    ImagePath: hospitalCorridor
  },
  {
    GalleryId: '14',
    Title: 'Intensive Care Unit (ICU) Ward',
    Category: 'Infrastructure',
    ImagePath: icuWard
  },
  {
    GalleryId: '15',
    Title: 'Mobile X-Ray Unit',
    Category: 'Infrastructure',
    ImagePath: mobileXray
  },
  {
    GalleryId: '16',
    Title: 'Digital DR Plate Detector',
    Category: 'Infrastructure',
    ImagePath: drPlate
  },
  {
    GalleryId: '17',
    Title: 'Horizontal Autoclave Sterilizer',
    Category: 'Infrastructure',
    ImagePath: autoclave
  },
  {
    GalleryId: '18',
    Title: 'Laminar Flow Operation Theatre',
    Category: 'Infrastructure',
    ImagePath: otRoomNew
  },
  {
    GalleryId: '20',
    Title: 'Vertical X-Ray Bucky Stand',
    Category: 'Infrastructure',
    ImagePath: xrayChestStand
  },
  {
    GalleryId: '21',
    Title: 'Maurya Hospital Outside Building & Parking',
    Category: 'Hospital',
    ImagePath: hospitalBuilding
  },
  {
    GalleryId: '22',
    Title: 'Maurya Hospital Entrance Signboards & Direction Boards',
    Category: 'Hospital',
    ImagePath: hospitalSignboard
  },
  {
    GalleryId: '23',
    Title: 'Maurya Hospital Front Entrance View',
    Category: 'Hospital',
    ImagePath: hospitalEntrance
  },
  {
    GalleryId: '24',
    Title: 'Multi Slice Advanced CT Imaging',
    Category: 'CT Scan',
    ImagePath: multiSliceImage
  }
];

const DEFAULT_ENQUIRIES = [
  {
    EnquiryId: '1',
    Name: 'Rajesh Gowda',
    Phone: '9876543210',
    Email: 'rajesh@gmail.com',
    Message: 'Need to book an orthopedic appointment for knee pain.',
    CreatedDate: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  }
];

// In-memory departments — keeps Vite-imported asset URLs alive (not serializable to localStorage)
let liveDepartments = DEFAULT_DEPARTMENTS.map(d => ({ ...d }));

// In-memory doctors — same reason: local asset imports must not be JSON-serialized to localStorage
let liveDoctors = DEFAULT_DOCTORS.map(d => ({ ...d }));

// Helper to initialize localStorage
const initializeDb = () => {
  // Departments are always served from DEFAULT_DEPARTMENTS in-memory (not localStorage)
  // because local asset imports have dynamic Vite hashes that break when cached.

  // Force reset facilities and gallery to display new local OT/lab/CT/hospital images
  if (!localStorage.getItem('mh_v26_reset')) {
    localStorage.removeItem('mh_facilities');
    localStorage.removeItem('mh_gallery');
    localStorage.removeItem('mh_content');
    localStorage.setItem('mh_v26_reset', 'true');
  }

  if (!localStorage.getItem('mh_content')) {
    localStorage.setItem('mh_content', JSON.stringify(DEFAULT_CONTENT));
  }
  if (!localStorage.getItem('mh_facilities')) {
    localStorage.setItem('mh_facilities', JSON.stringify(DEFAULT_FACILITIES));
  }
  if (!localStorage.getItem('mh_gallery')) {
    localStorage.setItem('mh_gallery', JSON.stringify(DEFAULT_GALLERY));
  }
  if (!localStorage.getItem('mh_enquiries')) {
    localStorage.setItem('mh_enquiries', JSON.stringify(DEFAULT_ENQUIRIES));
  }
};

initializeDb();

// CRUD operations matching backend routes
const mockDb = {
  get: (url) => {
    initializeDb();
    if (url === '/content') {
      return JSON.parse(localStorage.getItem('mh_content'));
    }
    if (url === '/departments') {
      return liveDepartments;
    }
    if (url === '/facilities') {
      return JSON.parse(localStorage.getItem('mh_facilities'));
    }
    if (url === '/doctors') {
      return liveDoctors;
    }
    if (url === '/gallery') {
      return JSON.parse(localStorage.getItem('mh_gallery'));
    }
    if (url === '/admin/enquiries') {
      return JSON.parse(localStorage.getItem('mh_enquiries'));
    }
    return null;
  },

  post: (url, body) => {
    initializeDb();
    if (url === '/contact') {
      const enquiries = JSON.parse(localStorage.getItem('mh_enquiries'));
      const newEnq = {
        EnquiryId: String(Date.now()),
        Name: body.name || body.get?.('name'),
        Phone: body.phone || body.get?.('phone'),
        Email: body.email || body.get?.('email') || '',
        Message: body.message || body.get?.('message'),
        CreatedDate: new Date().toISOString()
      };
      enquiries.unshift(newEnq);
      localStorage.setItem('mh_enquiries', JSON.stringify(enquiries));
      return { message: 'Enquiry submitted successfully' };
    }
    if (url === '/admin/login') {
      if (body.username === 'admin' && body.password === 'admin123') {
        return {
          token: 'mock-jwt-token-123456789',
          admin: { username: 'admin' }
        };
      }
      throw new Error('Invalid credentials');
    }

    // Admin inserts (formdata or json)
    const isFormData = body instanceof FormData;
    const getVal = (key) => isFormData ? body.get(key) : body[key];

    if (url === '/admin/doctors') {
      const newDoc = {
        DoctorId: String(Date.now()),
        Name: getVal('name'),
        Qualification: getVal('qualification') || 'MBBS',
        Specialization: getVal('specialization'),
        Experience: getVal('experience'),
        Image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      };
      liveDoctors.push(newDoc);
      return newDoc;
    }
    if (url === '/admin/departments') {
      const newDept = {
        DepartmentId: String(Date.now()),
        DepartmentName: getVal('departmentName'),
        Description: getVal('description'),
        Image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
      };
      liveDepartments.push(newDept);
      return newDept;
    }
    if (url === '/admin/facilities') {
      const facilities = JSON.parse(localStorage.getItem('mh_facilities'));
      const newFac = {
        FacilityId: String(Date.now()),
        Name: getVal('name'),
        Description: getVal('description'),
        Image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
      };
      facilities.push(newFac);
      localStorage.setItem('mh_facilities', JSON.stringify(facilities));
      return newFac;
    }
    if (url === '/admin/gallery') {
      const gallery = JSON.parse(localStorage.getItem('mh_gallery'));
      const newGal = {
        GalleryId: String(Date.now()),
        Title: getVal('title'),
        Category: getVal('category'),
        ImagePath: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=600'
      };
      gallery.push(newGal);
      localStorage.setItem('mh_gallery', JSON.stringify(gallery));
      return newGal;
    }
    return null;
  },

  put: (url, body) => {
    initializeDb();
    const isFormData = body instanceof FormData;
    const getVal = (key) => isFormData ? body.get(key) : body[key];

    if (url === '/admin/content') {
      localStorage.setItem('mh_content', JSON.stringify(body));
      return body;
    }

    // Doctors update
    if (url.startsWith('/admin/doctors/')) {
      const id = url.split('/').pop();
      liveDoctors = liveDoctors.map(doc => doc.DoctorId === id ? {
        ...doc,
        Name: getVal('name'),
        Qualification: getVal('qualification') || doc.Qualification,
        Specialization: getVal('specialization'),
        Experience: getVal('experience')
      } : doc);
      return { message: 'Doctor updated' };
    }
    // Departments update
    if (url.startsWith('/admin/departments/')) {
      const id = url.split('/').pop();
      liveDepartments = liveDepartments.map(dept => dept.DepartmentId === id ? {
        ...dept,
        DepartmentName: getVal('departmentName'),
        Description: getVal('description')
      } : dept);
      return { message: 'Department updated' };
    }
    // Facilities update
    if (url.startsWith('/admin/facilities/')) {
      const id = url.split('/').pop();
      let facilities = JSON.parse(localStorage.getItem('mh_facilities'));
      facilities = facilities.map(fac => fac.FacilityId === id ? {
        ...fac,
        Name: getVal('name'),
        Description: getVal('description')
      } : fac);
      localStorage.setItem('mh_facilities', JSON.stringify(facilities));
      return { message: 'Facility updated' };
    }
    // Gallery update
    if (url.startsWith('/admin/gallery/')) {
      const id = url.split('/').pop();
      let gallery = JSON.parse(localStorage.getItem('mh_gallery'));
      gallery = gallery.map(item => item.GalleryId === id ? {
        ...item,
        Title: getVal('title'),
        Category: getVal('category')
      } : item);
      localStorage.setItem('mh_gallery', JSON.stringify(gallery));
      return { message: 'Gallery updated' };
    }
    return null;
  },

  delete: (url) => {
    initializeDb();
    if (url.startsWith('/admin/doctors/')) {
      const id = url.split('/').pop();
      liveDoctors = liveDoctors.filter(doc => doc.DoctorId !== id);
      return { message: 'Deleted' };
    }
    if (url.startsWith('/admin/departments/')) {
      const id = url.split('/').pop();
      liveDepartments = liveDepartments.filter(dept => dept.DepartmentId !== id);
      return { message: 'Deleted' };
    }
    if (url.startsWith('/admin/facilities/')) {
      const id = url.split('/').pop();
      let facilities = JSON.parse(localStorage.getItem('mh_facilities'));
      facilities = facilities.filter(fac => fac.FacilityId !== id);
      localStorage.setItem('mh_facilities', JSON.stringify(facilities));
      return { message: 'Deleted' };
    }
    if (url.startsWith('/admin/gallery/')) {
      const id = url.split('/').pop();
      let gallery = JSON.parse(localStorage.getItem('mh_gallery'));
      gallery = gallery.filter(item => item.GalleryId !== id);
      localStorage.setItem('mh_gallery', JSON.stringify(gallery));
      return { message: 'Deleted' };
    }
    if (url.startsWith('/admin/enquiries/')) {
      const id = url.split('/').pop();
      let enquiries = JSON.parse(localStorage.getItem('mh_enquiries'));
      enquiries = enquiries.filter(enq => enq.EnquiryId !== id);
      localStorage.setItem('mh_enquiries', JSON.stringify(enquiries));
      return { message: 'Deleted' };
    }
    return null;
  }
};

export default mockDb;
