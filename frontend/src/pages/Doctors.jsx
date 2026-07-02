import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import useFetch from '../hooks/useFetch';

const fallbackDoctors = [
  {
    DoctorId: 1,
    Name: 'Dr. Ashok Kumar M.',
    Qualification: 'MBBS, MS, MCh (Neurosurgery)',
    Specialization: 'Neuro & Spine Surgery',
    Experience: '18 Years',
    Image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300'
  },
  {
    DoctorId: 2,
    Name: 'Dr. Sunitha Rao',
    Qualification: 'MBBS, MD, DGO',
    Specialization: 'Gynecology & Obstetrics',
    Experience: '15 Years',
    Image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300'
  },
  {
    DoctorId: 3,
    Name: 'Dr. Ramesh Prasad',
    Qualification: 'MBBS, MS (Orthopedics)',
    Specialization: 'Orthopedics & Joint Replacement',
    Experience: '14 Years',
    Image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
  },
  {
    DoctorId: 4,
    Name: 'Dr. Rajesh Gowda',
    Qualification: 'MBBS, MD (General Medicine)',
    Specialization: 'General Medicine',
    Experience: '12 Years',
    Image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300'
  },
  {
    DoctorId: 5,
    Name: 'Dr. Meera Nair',
    Qualification: 'MBBS, MD (Pediatrics), DCH',
    Specialization: 'Pediatrics & Neonatology',
    Experience: '10 Years',
    Image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=300'
  },
  {
    DoctorId: 6,
    Name: 'Dr. Vikram Dev',
    Qualification: 'MBBS, MCh (Plastic Surgery)',
    Specialization: 'Plastic & Reconstructive Surgery',
    Experience: '16 Years',
    Image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&q=80&w=300'
  }
];

const Doctors = () => {
  const { data: doctors, loading } = useFetch('/doctors');

  const displayedDoctors = doctors && doctors.length > 0 ? doctors : fallbackDoctors;

  return (
    <div className="doctors-page fade-in">

      {/* Premium Banner */}
      <PageBanner
        eyebrow="Expert Medical Team · Mysuru"
        title={<>Our Medical <span style={{ color: '#f0a070' }}>Specialists</span></>}
        subtitle="Meet our distinguished panel of clinical leaders, surgeons, and healthcare consultants."
        stats={[
          { value: '15+', label: 'Consultants' },
          { value: '200+', label: 'Years Combined Exp.' },
          { value: '24/7', label: 'On-Call Support' },
        ]}
      />

      {/* Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Expert Clinical Team</h2>
            <p>Our consultants deliver clinical care under specialized surgical protocols.</p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="loader-spinner" style={{ margin: '0 auto' }}></div>
            </div>
          )}

          {!loading && (
            <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {displayedDoctors.map((doc) => {
                const imgSource = doc.Image 
                  ? (doc.Image.startsWith('/uploads/') ? `http://localhost:5000${doc.Image}` : doc.Image)
                  : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300";
                
                return (
                  <Link
                    to={`/doctors/${doc.DoctorId}`}
                    key={doc.DoctorId}
                    className="hospital-card doctor-card"
                    style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}
                  >
                    <div style={{ padding: '30px 20px 20px' }}>
                      <img src={imgSource} alt={doc.Name} className="doctor-img" />
                      <h3>{doc.Name}</h3>
                      <div className="doctor-specialty">{doc.Specialization}</div>
                      <div className="doctor-qual">{doc.Qualification}</div>
                      <span className="doctor-exp">{doc.Experience} Experience</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Doctors;
