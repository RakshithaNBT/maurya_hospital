import React from 'react';
import PageBanner from '../components/PageBanner';
import useFetch from '../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import otRoomNew from '../assets/ot_room_new.jpg';
import icuWard from '../assets/icu_ward.jpg';
import hospitalPharma from '../assets/hospital_pharma.png';
import drPlate from '../assets/dr_plate.jpg';
import autoclave from '../assets/autoclave.jpg';
import labSensaCore from '../assets/lab_sensacore.jpg';
import labSysmex from '../assets/lab_sysmex.jpg';
import xrayChestStand from '../assets/xray_chest_stand.jpg';
import mobileXray from '../assets/facility_digital_xray.png';
import facilityUltrasound from '../assets/facility_ultrasound.png';
import facilityXrayOt from '../assets/facility_xray_ot.png';
import facilityDialysis from '../assets/facility_dialysis.png';
import facilityLaboratory from '../assets/facility_laboratory.png';
import facilityDaycare from '../assets/facility_daycare.png';

const fallbackFacilities = [
  {
    FacilityId: 4,
    Name: 'ULTRASOUND SCAN',
    Description: 'Advanced high-resolution ultrasound imaging for diagnostic precision in abdomen, obstetrics, and vascular studies.',
    Image: facilityUltrasound
  },
  {
    FacilityId: 5,
    Name: 'Digital X-Ray',
    Description: 'High-frequency digital radiography generating clean skeletal, orthotic, and thoracic imagery with minimal exposure.',
    Image: mobileXray
  },
  {
    FacilityId: 3,
    Name: 'Laboratory Services',
    Description: 'Advanced pathology and biochemistry laboratory providing rapid diagnosis and fully automated testing services.',
    Image: facilityLaboratory
  },
  {
    FacilityId: 1,
    Name: 'Modular Operation Theatre',
    Description: 'State-of-the-art laminar flow operating theatres equipped with modern anesthesia workstations and high-definition endoscopes.',
    Image: facilityXrayOt
  },
  {
    FacilityId: 2,
    Name: 'ICU Facility',
    Description: 'High-dependency chambers with 24/7 cardiac monitoring, bedside ventilators, and highly specialized critical care nursing staff.',
    Image: icuWard
  },
  {
    FacilityId: 6,
    Name: 'Day Care Procedures',
    Description: 'Efficient and convenient same-day diagnostic and therapeutic medical/surgical procedures without requiring overnight stay.',
    Image: facilityDaycare
  },
  {
    FacilityId: 7,
    Name: 'Dialysis',
    Description: 'Modern hemodialysis unit providing safe, comfortable, and sterile treatment for patients with chronic renal conditions.',
    Image: facilityDialysis
  },
  {
    FacilityId: 8,
    Name: 'CT Scan Room',
    Description: 'Fast high-resolution scanner providing 3D reconstructions, angiography, and prompt diagnostic imaging, available 24/7.',
    Image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600'
  },
  {
    FacilityId: 9,
    Name: 'Digital DR Plate Detector',
    Description: 'High-sensitivity digital radiography plate detector for crystal-clear diagnostic X-Ray imaging.',
    Image: drPlate
  },
  {
    FacilityId: 10,
    Name: 'Horizontal Autoclave Sterilizer',
    Description: 'Heavy-duty steam sterilizer chamber ensuring complete sterile processing of surgical instruments and supplies.',
    Image: autoclave
  },
  {
    FacilityId: 11,
    Name: 'Sensa Core Electrolyte Analyzer',
    Description: 'Fully automated electrolyte analyzer providing rapid and precise blood analysis in our pathology lab.',
    Image: labSensaCore
  },
  {
    FacilityId: 12,
    Name: 'Vertical X-Ray Bucky Stand',
    Description: 'Erect vertical chest stand designed for stable positioning during clinical chest radiography and standing examinations.',
    Image: xrayChestStand
  }
];

const Facilities = () => {
  const { t, i18n } = useTranslation();
  const { data: facilities, loading } = useFetch('/facilities');

  const displayedFacilities = facilities && facilities.length > 0 ? facilities : fallbackFacilities;

  return (
    <div className="facilities-page fade-in lang-fade-transition" key={i18n.language}>

      {/* Premium Banner */}
      <PageBanner
        eyebrow={i18n.language.startsWith('kn') ? 'ಅತ್ಯಾಧುನಿಕ ಮೂಲಸೌಕರ್ಯ' : 'State-of-the-Art Infrastructure'}
        title={<>{t('nav.facilities')}</>}
        subtitle={i18n.language.startsWith('kn') ? 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಯು ರೋಗಿಗಳ ಗುಣಮುಖರಾಗಲು ಅತ್ಯುತ್ತಮ ಸೌಲಭ್ಯಗಳನ್ನು ಮತ್ತು ಚಿಕಿತ್ಸಾ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಹೊಂದಿದೆ.' : 'We support patient care with top-tier infrastructure, operating theatres, diagnostic services, and inpatient support.'}
        stats={[
          { value: '3', label: i18n.language.startsWith('kn') ? 'ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಕೊಠಡಿಗಳು' : 'Operation Theatres' },
          { value: 'ICU', label: i18n.language.startsWith('kn') ? 'ತೀವ್ರ ನಿಗಾ ಘಟಕ' : 'Critical Care Unit' },
          { value: '24/7', label: i18n.language.startsWith('kn') ? 'ಲ್ಯಾಬ್ ಮತ್ತು ರೋಗನಿರ್ಣಯ' : 'Lab & Diagnostics' },
        ]}
      />

      {/* Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t('facilities.heading')}</h2>
            <p>{t('facilities.subheading')}</p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="loader-spinner" style={{ margin: '0 auto' }}></div>
            </div>
          )}

          {!loading && (
            <div className="cards-grid">
              {displayedFacilities.map((fac) => {
                const imgSource = fac.Image
                  ? (fac.Image.startsWith('/uploads/') ? `http://localhost:5000${fac.Image}` : fac.Image)
                  : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600";

                const isTall = fac.Name.includes('X-Ray') || fac.Name.includes('Bucky') || fac.Name.includes('Laboratory');
                const imgClass = isTall ? "card-img-tall" : "";

                return (
                  <div
                    key={fac.FacilityId}
                    className="hospital-card"
                  >
                    <div className="card-img-wrapper">
                      <img src={imgSource} alt={t(`facilities_data.${fac.FacilityId}.name`, { defaultValue: fac.Name })} className={imgClass} />
                    </div>
                    <div className="card-content">
                      <h3>{t(`facilities_data.${fac.FacilityId}.name`, { defaultValue: fac.Name })}</h3>
                      <p>{t(`facilities_data.${fac.FacilityId}.desc`, { defaultValue: fac.Description })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Facilities;
