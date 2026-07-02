import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PageBanner from '../components/PageBanner';
import useFetch from '../hooks/useFetch';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const fallbackGallery = [
  {
    GalleryId: 2,
    Title: 'Premium Consultation Room',
    ImagePath: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    Category: 'Infrastructure',
    Description: 'State-of-the-art consultation rooms designed for patient comfort and privacy.'
  },
  {
    GalleryId: 3,
    Title: 'Advanced GE CT Scan Room',
    ImagePath: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800',
    Category: 'CT Scan',
    Description: 'Our 24/7 advanced CT scanning facility provides high-resolution imaging for accurate diagnosis.'
  },
  {
    GalleryId: 4,
    Title: 'Digital X-Ray System',
    ImagePath: 'https://images.unsplash.com/photo-1582560372922-38ac5537df22?auto=format&fit=crop&q=80&w=800',
    Category: 'CT Scan',
    Description: 'Low radiation digital X-Ray systems delivering instant, crystal-clear results.'
  },
  {
    GalleryId: 5,
    Title: 'Annual Free Health Camp',
    ImagePath: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    Category: 'Events',
    Description: 'Community outreach programs offering free checkups and medical advice to the public.'
  },
  {
    GalleryId: 6,
    Title: 'Laminar Flow Operation Theatre',
    ImagePath: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    Category: 'Infrastructure',
    Description: 'Ultra-clean, modern surgical suites equipped with advanced life-support systems.'
  },
  {
    GalleryId: 7,
    Title: 'Critical Care Unit Setup',
    ImagePath: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    Category: 'Infrastructure',
    Description: 'Intensive care units with 1:1 nursing ratio and advanced monitoring equipment.'
  },
  {
    GalleryId: 8,
    Title: 'Independence Day Celebration',
    ImagePath: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    Category: 'Events',
    Description: 'Hospital staff and management celebrating national events with patients and visitors.'
  }
];

const Gallery = () => {
  const { data: gallery, loading } = useFetch('/gallery');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pillStyle, setPillStyle] = useState({});
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);
  const activeBtnRef = useRef(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedGallery = gallery && gallery.length > 0 ? gallery : fallbackGallery;
  const categories = ['All', 'Hospital', 'CT Scan', 'Infrastructure', 'Events'];

  const filteredGallery = selectedCategory === 'All'
    ? displayedGallery
    : displayedGallery.filter(item => item.Category.toLowerCase() === selectedCategory.toLowerCase());

  // Handle active button sliding pill positioning
  useEffect(() => {
    const updatePill = () => {
      if (activeBtnRef.current && containerRef.current) {
        const activeRect = activeBtnRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setPillStyle({
          width: `${activeRect.width}px`,
          left: `${activeRect.left - containerRect.left}px`,
          height: `${activeRect.height}px`,
          top: `${activeRect.top - containerRect.top}px`
        });
      }
    };
    updatePill();
    window.addEventListener('load', updatePill);
    window.addEventListener('resize', updatePill);
    return () => {
      window.removeEventListener('load', updatePill);
      window.removeEventListener('resize', updatePill);
    };
  }, [selectedCategory, loading]);

  // Handle staggered entry animation toggle
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 25);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex, filteredGallery.length]);

  // Helper to construct seamless marquee loop items
  const getMarqueeItems = (items) => {
    if (!items || items.length === 0) return [];
    let looped = [...items];
    while (looped.length < 10) {
      looped = [...looped, ...items];
    }
    return [...looped, ...looped];
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  return (
    <div className="gallery-page fade-in">
      {/* Premium Banner */}
      <PageBanner
        eyebrow="Maurya Hospital · Visual Tour"
        title={<>Hospital <span style={{ color: '#f0a070' }}>Gallery</span></>}
        subtitle="A visual overview of our infrastructure, medical technology, health events, and celebrations."
        stats={[
          { value: '50+', label: 'Photos' },
          { value: '6+', label: 'Categories' },
          { value: '2018', label: 'Est. Year' },
        ]}
      />

      <section className="section-padding" style={{ backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
        <div className="container">
          
          {/* Category Filter Container with sliding background pill */}
          <div className="gallery-filter-container" ref={containerRef}>
            <div className="sliding-pill" style={{ ...pillStyle, position: 'absolute', transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)', zIndex: 1, backgroundColor: 'var(--primary-color)', borderRadius: '30px' }} />
            <div className="gallery-filter" style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  ref={selectedCategory === cat ? activeBtnRef : null}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '10px 24px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: selectedCategory === cat ? '#fff' : 'var(--text-color)',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    borderRadius: '30px',
                    outline: 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="loader-spinner" style={{ margin: '0 auto' }}></div>
            </div>
          )}

          {!loading && selectedCategory === 'All' && (
            <div className={`marquee-gallery ${animate ? 'animate-fade-in' : ''}`}>
              {/* Row 1: All Showcase */}
              <div className="marquee-row-wrapper">
                <div className="marquee-container">
                  <div className="marquee-content">
                    {getMarqueeItems(displayedGallery).map((item, idx) => {
                      const imgSource = item.ImagePath
                        ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                        : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                      return (
                        <div key={`all-${item.GalleryId}-${idx}`} className="marquee-item">
                          <img src={imgSource} alt={item.Title} loading="lazy" />
                          <div className="masonry-overlay">
                            <h3>{item.Title}</h3>
                            <p>{item.Category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 2: Hospital */}
              <div className="marquee-row-wrapper">
                <div className="marquee-container">
                  <div className="marquee-content" style={{ animationDuration: '24s' }}>
                    {getMarqueeItems(displayedGallery.filter(item => item.Category.toLowerCase() === 'hospital')).map((item, idx) => {
                      const imgSource = item.ImagePath
                        ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                        : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                      return (
                        <div key={`hosp-${item.GalleryId}-${idx}`} className="marquee-item">
                          <img src={imgSource} alt={item.Title} loading="lazy" />
                          <div className="masonry-overlay">
                            <h3>{item.Title}</h3>
                            <p>{item.Category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: CT Scan */}
              <div className="marquee-row-wrapper">
                <div className="marquee-container">
                  <div className="marquee-content" style={{ animationDuration: '32s' }}>
                    {getMarqueeItems(displayedGallery.filter(item => item.Category.toLowerCase() === 'ct scan')).map((item, idx) => {
                      const imgSource = item.ImagePath
                        ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                        : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                      return (
                        <div key={`ct-${item.GalleryId}-${idx}`} className="marquee-item">
                          <img src={imgSource} alt={item.Title} loading="lazy" />
                          <div className="masonry-overlay">
                            <h3>{item.Title}</h3>
                            <p>{item.Category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 4: Infrastructure */}
              <div className="marquee-row-wrapper">
                <div className="marquee-container">
                  <div className="marquee-content" style={{ animationDuration: '28s' }}>
                    {getMarqueeItems(displayedGallery.filter(item => item.Category.toLowerCase() === 'infrastructure')).map((item, idx) => {
                      const imgSource = item.ImagePath
                        ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                        : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                      return (
                        <div key={`infra-${item.GalleryId}-${idx}`} className="marquee-item">
                          <img src={imgSource} alt={item.Title} loading="lazy" />
                          <div className="masonry-overlay">
                            <h3>{item.Title}</h3>
                            <p>{item.Category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 5: Events */}
              <div className="marquee-row-wrapper">
                <div className="marquee-container">
                  <div className="marquee-content" style={{ animationDuration: '36s' }}>
                    {getMarqueeItems(displayedGallery.filter(item => item.Category.toLowerCase() === 'events')).map((item, idx) => {
                      const imgSource = item.ImagePath
                        ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                        : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                      return (
                        <div key={`events-${item.GalleryId}-${idx}`} className="marquee-item">
                          <img src={imgSource} alt={item.Title} loading="lazy" />
                          <div className="masonry-overlay">
                            <h3>{item.Title}</h3>
                            <p>{item.Category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && selectedCategory !== 'All' && (
            <div className={`premium-masonry ${animate ? 'animate-fade-in' : ''}`}>
              {filteredGallery.map((item, index) => {
                const imgSource = item.ImagePath
                  ? (item.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${item.ImagePath}` : item.ImagePath)
                  : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";
                
                return (
                  <div key={item.GalleryId} className="premium-masonry-item" onClick={() => openModal(index)}>
                    <img src={imgSource} alt={item.Title} loading="lazy" />
                    <div className="premium-masonry-overlay">
                      <div className="premium-overlay-content">
                        <span className="view-details-btn">View Details →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!loading && filteredGallery.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <h3>No images available in this category.</h3>
              <p>Please select another category to view our gallery.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {isModalOpen && filteredGallery[currentIndex] && (() => {
        const activeItem = filteredGallery[currentIndex];
        const activeImgSource = activeItem.ImagePath
          ? (activeItem.ImagePath.startsWith('/uploads/') ? `http://localhost:5000${activeItem.ImagePath}` : activeItem.ImagePath)
          : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800";

        return createPortal(
          <div className="lightbox-modal">
            <div className="lightbox-backdrop" onClick={closeModal}></div>
            
            <button className="lightbox-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="lightbox-content">
              <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <FaChevronLeft />
              </button>

              <div className="lightbox-layout">
                <div className="lightbox-image-container">
                  <img src={activeImgSource} alt={activeItem.Title} />
                </div>
                <div className="lightbox-details">
                  <span className="lightbox-category">{activeItem.Category}</span>
                  <h2>{activeItem.Title}</h2>
                  <p>{activeItem.Description || "Explore the state-of-the-art facilities and events at Maurya Hospital, designed to provide the highest standard of care."}</p>
                  
                  <div className="lightbox-meta">
                    <div className="meta-item">
                      <strong>Facility Type:</strong> {activeItem.Category}
                    </div>
                    <div className="meta-item">
                      <strong>Location:</strong> Main Hospital Building
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={closeModal}>
                    Close View
                  </button>
                </div>
              </div>

              <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <FaChevronRight />
              </button>
            </div>
          </div>,
          document.body
        );
      })()}

      <style>{`
        /* Premium Masonry Grid */
        .premium-masonry {
          column-count: 4;
          column-gap: 20px;
          margin-top: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .premium-masonry.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .premium-masonry-item {
          break-inside: avoid;
          margin-bottom: 20px;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background: #fff;
          transform: translateZ(0); /* Hardware acceleration */
        }

        .premium-masonry-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(183, 28, 28, 0.2);
        }

        .premium-masonry-item img {
          width: 100%;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .premium-masonry-item:hover img {
          transform: scale(1.05);
        }

        .premium-masonry-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 24px;
        }

        .premium-masonry-item:hover .premium-masonry-overlay {
          opacity: 1;
        }

        .premium-overlay-content {
          color: white;
          transform: translateY(20px);
          transition: transform 0.4s ease;
          width: 100%;
        }

        .premium-masonry-item:hover .premium-overlay-content {
          transform: translateY(0);
        }

        .premium-overlay-content h3 {
          margin: 0 0 5px 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .premium-overlay-content p {
          margin: 0 0 15px 0;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .view-details-btn {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #f0a070;
          border-bottom: 1px solid #f0a070;
          padding-bottom: 2px;
        }

        /* Lightbox Modal */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease forwards;
        }

        .lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .lightbox-close:hover {
          background: var(--primary-color);
          transform: rotate(90deg);
        }

        .lightbox-content {
          position: relative;
          z-index: 1;
          width: 90%;
          max-width: 1200px;
          height: 80vh;
          max-height: 800px;
          display: flex;
          align-items: center;
          gap: 20px;
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .lightbox-layout {
          display: flex;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          width: 100%;
          height: 100%;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }

        .lightbox-image-container {
          flex: 2;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .lightbox-image-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: fadeIn 0.5s ease;
        }

        .lightbox-details {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          background: #f9f9f9;
        }

        .lightbox-category {
          color: var(--primary-color);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .lightbox-details h2 {
          font-size: 2rem;
          color: var(--secondary-color);
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .lightbox-details p {
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .lightbox-meta {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #eee;
          margin-bottom: 30px;
        }

        .meta-item {
          margin-bottom: 10px;
          font-size: 0.95rem;
          color: var(--text-color);
        }
        .meta-item:last-child {
          margin-bottom: 0;
        }
        .meta-item strong {
          color: var(--secondary-color);
        }

        .lightbox-nav {
          background: rgba(255,255,255,0.1);
          color: white;
          border: none;
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }

        .lightbox-nav:hover {
          background: var(--primary-color);
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .premium-masonry { column-count: 3; }
        }

        @media (max-width: 768px) {
          .premium-masonry { column-count: 2; }
          .lightbox-layout { flex-direction: column; }
          .lightbox-image-container { flex: 1.5; }
          .lightbox-details { flex: 1; padding: 20px; overflow-y: auto; }
          .lightbox-nav { display: none; } /* Could replace with swipe in real app */
          .lightbox-content { height: 90vh; }
        }

        @media (max-width: 480px) {
          .premium-masonry { column-count: 1; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
