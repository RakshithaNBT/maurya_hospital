import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import useFetch from '../hooks/useFetch';
import API from '../services/api';
import { FaUserMd, FaHospital, FaImages, FaInbox, FaPlus, FaEye, FaTrash, FaCheck, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load public lists (which we will sync or mutate manually)
  const { data: doctors, refetch: refetchDoctors } = useFetch('/doctors');
  const { data: departments, refetch: refetchDepartments } = useFetch('/departments');
  const { data: facilities, refetch: refetchFacilities } = useFetch('/facilities');
  const { data: gallery, refetch: refetchGallery } = useFetch('/gallery');
  const { data: content, refetch: refetchContent } = useFetch('/content');

  // Admin-only inquiries fetching
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  useEffect(() => {
    if (activeTab === 'enquiries' || activeTab === 'dashboard') {
      fetchEnquiries();
    }
  }, [activeTab]);

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const response = await API.get('/admin/enquiries');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Modals management
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create' or 'edit'
  const [currentItem, setCurrentItem] = useState(null); // Item to edit/view
  const [viewModalOpen, setViewModalOpen] = useState(false); // To view full enquiry details

  // Forms state
  const [doctorForm, setDoctorForm] = useState({ name: '', qualification: '', specialization: '', experience: '' });
  const [departmentForm, setDepartmentForm] = useState({ departmentName: '', description: '' });
  const [facilityForm, setFacilityForm] = useState({ name: '', description: '' });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Hospital' });
  const [selectedFile, setSelectedFile] = useState(null);

  // Content edit state
  const [contentForm, setContentForm] = useState({});

  useEffect(() => {
    if (content) {
      setContentForm(content);
    }
  }, [content]);

  // Form reset helpers
  const resetForms = () => {
    setDoctorForm({ name: '', qualification: '', specialization: '', experience: '' });
    setDepartmentForm({ departmentName: '', description: '' });
    setFacilityForm({ name: '', description: '' });
    setGalleryForm({ title: '', category: 'Hospital' });
    setSelectedFile(null);
    setCurrentItem(null);
  };

  // Open modals helper
  const openCreateModal = (tabName) => {
    resetForms();
    setModalType('create');
    setModalOpen(true);
  };

  const openEditModal = (tabName, item) => {
    resetForms();
    setModalType('edit');
    setCurrentItem(item);

    if (tabName === 'doctors') {
      setDoctorForm({
        name: item.Name,
        qualification: item.Qualification,
        specialization: item.Specialization,
        experience: item.Experience
      });
    } else if (tabName === 'departments') {
      setDepartmentForm({
        departmentName: item.DepartmentName,
        description: item.Description
      });
    } else if (tabName === 'facilities') {
      setFacilityForm({
        name: item.Name,
        description: item.Description
      });
    } else if (tabName === 'gallery') {
      setGalleryForm({
        title: item.Title,
        category: item.Category
      });
    }
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    let url = '';
    let success = false;

    try {
      if (activeTab === 'doctors') {
        formData.append('name', doctorForm.name);
        formData.append('qualification', doctorForm.qualification);
        formData.append('specialization', doctorForm.specialization);
        formData.append('experience', doctorForm.experience);

        if (modalType === 'create') {
          await API.post('/admin/doctors', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.put(`/admin/doctors/${currentItem.DoctorId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
        refetchDoctors();
        success = true;
      } else if (activeTab === 'departments') {
        formData.append('departmentName', departmentForm.departmentName);
        formData.append('description', departmentForm.description);

        if (modalType === 'create') {
          await API.post('/admin/departments', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.put(`/admin/departments/${currentItem.DepartmentId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
        refetchDepartments();
        success = true;
      } else if (activeTab === 'facilities') {
        formData.append('name', facilityForm.name);
        formData.append('description', facilityForm.description);

        if (modalType === 'create') {
          await API.post('/admin/facilities', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.put(`/admin/facilities/${currentItem.FacilityId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
        refetchFacilities();
        success = true;
      } else if (activeTab === 'gallery') {
        formData.append('title', galleryForm.title);
        formData.append('category', galleryForm.category);

        if (modalType === 'create') {
          await API.post('/admin/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.put(`/admin/gallery/${currentItem.GalleryId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
        refetchGallery();
        success = true;
      }

      if (success) {
        setModalOpen(false);
        resetForms();
        alert(`${activeTab.slice(0, -1)} saved successfully!`);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert(error.response?.data?.message || 'Action failed. Please try again.');
    }
  };

  // Delete handler
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (activeTab === 'doctors') {
        await API.delete(`/admin/doctors/${id}`);
        refetchDoctors();
      } else if (activeTab === 'departments') {
        await API.delete(`/admin/departments/${id}`);
        refetchDepartments();
      } else if (activeTab === 'facilities') {
        await API.delete(`/admin/facilities/${id}`);
        refetchFacilities();
      } else if (activeTab === 'gallery') {
        await API.delete(`/admin/gallery/${id}`);
        refetchGallery();
      } else if (activeTab === 'enquiries') {
        await API.delete(`/admin/enquiries/${id}`);
        fetchEnquiries();
      }
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Deletion error:', error);
      alert(error.response?.data?.message || 'Failed to delete item.');
    }
  };

  // Content edits handler
  const handleContentSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/admin/content', contentForm);
      refetchContent();
      alert('Website text content updated successfully!');
    } catch (error) {
      console.error('Content update error:', error);
      alert('Failed to update web content.');
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="fade-in">
        
        {/* ========================================================
            TABS VIEW: 1. DASHBOARD
           ======================================================== */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Doctors</h3>
                  <p>{doctors?.length || 0}</p>
                </div>
                <div className="admin-stat-icon"><FaUserMd /></div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Departments</h3>
                  <p>{departments?.length || 0}</p>
                </div>
                <div className="admin-stat-icon"><FaHospital /></div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Gallery Photos</h3>
                  <p>{gallery?.length || 0}</p>
                </div>
                <div className="admin-stat-icon"><FaImages /></div>
              </div>
              <div className="admin-stat-card" style={{ borderLeftColor: 'var(--accent-color)' }}>
                <div className="admin-stat-info">
                  <h3>Client Enquiries</h3>
                  <p>{enquiries?.length || 0}</p>
                </div>
                <div className="admin-stat-icon"><FaInbox /></div>
              </div>
            </div>

            <div className="contact-form-panel" style={{ padding: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Quick Welcome Overview</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Welcome to Maurya Hospital Management Console. You can use the left sidebar tabs to perform operations on database collections, retrieve messages, and update dashboard content.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 2. DOCTORS MANAGEMENT
           ======================================================== */}
        {activeTab === 'doctors' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>Doctor Profiles</h2>
              <button className="btn btn-primary btn-sm" onClick={() => openCreateModal('doctors')}>
                <FaPlus /> Add Doctor
              </button>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors && doctors.map((doc) => (
                  <tr key={doc.DoctorId}>
                    <td>
                      <img 
                        src={doc.Image ? (doc.Image.startsWith('/uploads/') ? `http://localhost:5000${doc.Image}` : doc.Image) : "https://via.placeholder.com/50"} 
                        alt={doc.Name} 
                        className="table-img" 
                      />
                    </td>
                    <td><strong>{doc.Name}</strong></td>
                    <td>{doc.Specialization}</td>
                    <td>{doc.Qualification}</td>
                    <td>{doc.Experience}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-edit btn-sm" onClick={() => openEditModal('doctors', doc)}><FaEdit /></button>
                        <button className="btn btn-delete btn-sm" onClick={() => handleDeleteItem(doc.DoctorId)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 3. DEPARTMENTS MANAGEMENT
           ======================================================== */}
        {activeTab === 'departments' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>Hospital Departments</h2>
              <button className="btn btn-primary btn-sm" onClick={() => openCreateModal('departments')}>
                <FaPlus /> Add Department
              </button>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments && departments.map((dept) => (
                  <tr key={dept.DepartmentId}>
                    <td>
                      <img 
                        src={dept.Image ? (dept.Image.startsWith('/uploads/') ? `http://localhost:5000${dept.Image}` : dept.Image) : "https://via.placeholder.com/50"} 
                        alt={dept.DepartmentName} 
                        className="table-img" 
                      />
                    </td>
                    <td><strong>{dept.DepartmentName}</strong></td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dept.Description}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-edit btn-sm" onClick={() => openEditModal('departments', dept)}><FaEdit /></button>
                        <button className="btn btn-delete btn-sm" onClick={() => handleDeleteItem(dept.DepartmentId)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 4. FACILITIES MANAGEMENT
           ======================================================== */}
        {activeTab === 'facilities' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>Infrastructure Facilities</h2>
              <button className="btn btn-primary btn-sm" onClick={() => openCreateModal('facilities')}>
                <FaPlus /> Add Facility
              </button>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Facility Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facilities && facilities.map((fac) => (
                  <tr key={fac.FacilityId}>
                    <td>
                      <img 
                        src={fac.Image ? (fac.Image.startsWith('/uploads/') ? `http://localhost:5000${fac.Image}` : fac.Image) : "https://via.placeholder.com/50"} 
                        alt={fac.Name} 
                        className="table-img" 
                      />
                    </td>
                    <td><strong>{fac.Name}</strong></td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fac.Description}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-edit btn-sm" onClick={() => openEditModal('facilities', fac)}><FaEdit /></button>
                        <button className="btn btn-delete btn-sm" onClick={() => handleDeleteItem(fac.FacilityId)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 5. GALLERY MANAGEMENT
           ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>Gallery Images</h2>
              <button className="btn btn-primary btn-sm" onClick={() => openCreateModal('gallery')}>
                <FaPlus /> Add Image
              </button>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gallery && gallery.map((item) => (
                  <tr key={item.GalleryId}>
                    <td>
                      <img 
                        src={item.ImagePath ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath) : "https://via.placeholder.com/50"} 
                        alt={item.Title} 
                        className="table-img" 
                      />
                    </td>
                    <td><strong>{item.Title}</strong></td>
                    <td>{item.Category}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-edit btn-sm" onClick={() => openEditModal('gallery', item)}><FaEdit /></button>
                        <button className="btn btn-delete btn-sm" onClick={() => handleDeleteItem(item.GalleryId)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 6. CONTACT ENQUIRIES VIEWING
           ======================================================== */}
        {activeTab === 'enquiries' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>Contact Enquiries</h2>
              <button className="btn btn-secondary btn-sm" onClick={fetchEnquiries}>Refresh</button>
            </div>

            {loadingEnquiries ? (
              <div style={{ textAlign: 'center', padding: '40px' }}><div className="loader-spinner" style={{ margin: '0 auto' }}></div></div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Snippet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.EnquiryId}>
                      <td>{new Date(enq.CreatedDate).toLocaleDateString()}</td>
                      <td><strong>{enq.Name}</strong></td>
                      <td>{enq.Phone}</td>
                      <td>{enq.Email || '-'}</td>
                      <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{enq.Message}</td>
                      <td>
                        <div className="admin-actions">
                          <button 
                            className="btn btn-primary btn-sm" 
                            style={{ backgroundColor: '#2196F3' }}
                            onClick={() => {
                              setCurrentItem(enq);
                              setViewModalOpen(true);
                            }}
                          >
                            <FaEye /> View
                          </button>
                          <button className="btn btn-delete btn-sm" onClick={() => handleDeleteItem(enq.EnquiryId)}><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ========================================================
            TABS VIEW: 7. DYNAMIC CONTENT SETTINGS
           ======================================================== */}
        {activeTab === 'content' && (
          <div className="contact-form-panel">
            <h3>Update Home Page Content</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '0.85rem' }}>
              Update title scripts, statistics, and welcome descriptors in real time.
            </p>

            <form onSubmit={handleContentSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input 
                    type="text" 
                    value={contentForm.hospital_name || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, hospital_name: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Parent Healthcare Group</label>
                  <input 
                    type="text" 
                    value={contentForm.parent_company || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, parent_company: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Beds Statistics</label>
                  <input 
                    type="text" 
                    value={contentForm.stats_beds || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, stats_beds: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Doctors Statistics</label>
                  <input 
                    type="text" 
                    value={contentForm.stats_doctors || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, stats_doctors: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Clinical Staff Statistics</label>
                  <input 
                    type="text" 
                    value={contentForm.stats_staff || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, stats_staff: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Patients Served Statistics</label>
                  <input 
                    type="text" 
                    value={contentForm.stats_patients_served || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, stats_patients_served: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: '20px 0' }}>
                <label>Welcome Message Title</label>
                <input 
                  type="text" 
                  value={contentForm.welcome_title || ''} 
                  onChange={(e) => setContentForm({ ...contentForm, welcome_title: e.target.value })} 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Welcome Message Body Text</label>
                <textarea 
                  rows="5" 
                  value={contentForm.welcome_text || ''} 
                  onChange={(e) => setContentForm({ ...contentForm, welcome_text: e.target.value })} 
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '200px' }}>
                Save Updates
              </button>
            </form>
          </div>
        )}

        {/* ========================================================
            MODAL POPUP: CREATE / EDIT RECORD MODAL
           ======================================================== */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{modalType === 'create' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}</h3>
                <span className="modal-close" onClick={() => setModalOpen(false)}>&times;</span>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  {/* DOCTORS FORM */}
                  {activeTab === 'doctors' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div className="form-group">
                        <label>Doctor Name</label>
                        <input 
                          type="text" 
                          value={doctorForm.name} 
                          onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Qualification</label>
                        <input 
                          type="text" 
                          value={doctorForm.qualification} 
                          onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Specialization</label>
                        <input 
                          type="text" 
                          value={doctorForm.specialization} 
                          onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Experience (e.g., "12 Years")</label>
                        <input 
                          type="text" 
                          value={doctorForm.experience} 
                          onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} 
                          required 
                        />
                      </div>
                    </div>
                  )}

                  {/* DEPARTMENTS FORM */}
                  {activeTab === 'departments' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div className="form-group">
                        <label>Department Name</label>
                        <input 
                          type="text" 
                          value={departmentForm.departmentName} 
                          onChange={(e) => setDepartmentForm({ ...departmentForm, departmentName: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea 
                          rows="4" 
                          value={departmentForm.description} 
                          onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })} 
                          required 
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* FACILITIES FORM */}
                  {activeTab === 'facilities' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div className="form-group">
                        <label>Facility Name</label>
                        <input 
                          type="text" 
                          value={facilityForm.name} 
                          onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea 
                          rows="4" 
                          value={facilityForm.description} 
                          onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })} 
                          required 
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* GALLERY FORM */}
                  {activeTab === 'gallery' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div className="form-group">
                        <label>Title / Caption</label>
                        <input 
                          type="text" 
                          value={galleryForm.title} 
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={galleryForm.category} 
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        >
                          <option value="Hospital">Hospital</option>
                          <option value="CT Scan">CT Scan</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Events">Events</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* FILE UPLOAD INPUT */}
                  <div className="form-group" style={{ marginTop: '20px' }}>
                    <label>Upload Image {modalType === 'create' && activeTab === 'gallery' && <span style={{ color: 'red' }}>*</span>}</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      required={modalType === 'create' && activeTab === 'gallery'} 
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL POPUP: ENQUIRY VIEW DETAILS MODAL
           ======================================================== */}
        {viewModalOpen && currentItem && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>View Contact Enquiry</h3>
                <span className="modal-close" onClick={() => setViewModalOpen(false)}>&times;</span>
              </div>
              
              <div className="modal-body">
                <div className="enquiry-detail-item">
                  <label>Submitted Date</label>
                  <p>{new Date(currentItem.CreatedDate).toLocaleString()}</p>
                </div>
                <div className="enquiry-detail-item">
                  <label>Sender Full Name</label>
                  <p><strong>{currentItem.Name}</strong></p>
                </div>
                <div className="enquiry-detail-item">
                  <label>Contact Phone</label>
                  <p>{currentItem.Phone}</p>
                </div>
                <div className="enquiry-detail-item">
                  <label>Contact Email</label>
                  <p>{currentItem.Email || 'No email provided'}</p>
                </div>
                <div className="enquiry-detail-item" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '15px' }}>
                  <label>Message Content</label>
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{currentItem.Message}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setViewModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
