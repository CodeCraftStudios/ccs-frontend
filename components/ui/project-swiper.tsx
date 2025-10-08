"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import GLightbox styles
import 'glightbox/dist/css/glightbox.min.css';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  alt?: string;
}

interface ProjectSwiperProps {
  items: MediaItem[];
  className?: string;
}

// Component that only renders on client side
function ClientSideSwiper({ items, className = '' }: ProjectSwiperProps) {
  const lightboxRef = useRef<any>(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);
  const [SwiperComponent, setSwiperComponent] = useState<any>(null);
  const [SwiperSlideComponent, setSwiperSlideComponent] = useState<any>(null);
  const [swiperModules, setSwiperModules] = useState<any[]>([]);

  useEffect(() => {
    // Load Swiper components and modules
    const loadSwiper = async () => {
      try {
        const [swiperModule, modulesModule] = await Promise.all([
          import('swiper/react'),
          import('swiper/modules')
        ]);

        setSwiperComponent(() => swiperModule.Swiper);
        setSwiperSlideComponent(() => swiperModule.SwiperSlide);
        setSwiperModules([
          modulesModule.Navigation,
          modulesModule.Pagination,
          modulesModule.Autoplay,
          modulesModule.EffectCoverflow
        ]);
        setSwiperLoaded(true);
      } catch (error) {
        console.error('Failed to load Swiper:', error);
      }
    };

    loadSwiper();
  }, []);

  useEffect(() => {
    if (!swiperLoaded) return;

    // Initialize GLightbox
    const initializeLightbox = async () => {
      try {
        const GLightbox = (await import('glightbox')).default;

        const galleryItems = items.map((item) => ({
          href: item.src,
          type: item.type,
          title: item.title || '',
          description: item.description || '',
          ...(item.type === 'video' && {
            source: 'local',
            width: '900px',
            height: '506px'
          })
        }));

        lightboxRef.current = GLightbox({
          elements: galleryItems,
          touchNavigation: true,
          loop: true,
          autoplayVideos: true,
          plyr: {
            config: {
              ratio: '16:9',
              muted: false,
              hideControls: false,
              youtube: {
                noCookie: true,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3
              },
              vimeo: {
                byline: false,
                portrait: false,
                title: false,
                speed: true,
                transparent: false
              }
            }
          }
        });
      } catch (error) {
        console.error('Failed to initialize GLightbox:', error);
      }
    };

    initializeLightbox();

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, [items, swiperLoaded]);

  const handleSlideClick = (index: number) => {
    if (lightboxRef.current) {
      lightboxRef.current.openAt(index);
    }
  };

  // Show loading skeleton while swiper loads
  if (!swiperLoaded || !SwiperComponent || !SwiperSlideComponent) {
    return (
      <div className={`project-swiper-container ${className}`}>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-80 h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`project-swiper-container ${className}`}>
      <SwiperComponent
        modules={swiperModules}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 35,
          },
        }}
        className="project-swiper"
      >
        {items.map((item, index) => (
          <SwiperSlideComponent key={item.id} className="swiper-slide-custom">
            <div className="media-container group cursor-pointer" onClick={() => handleSlideClick(index)}>
              <div className="media-wrapper relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg transition-all duration-500 hover:shadow-2xl">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt || item.title || `Project ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative">
                    <img
                      src={item.thumbnail || item.src}
                      alt={item.alt || item.title || `Video ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay with title and description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    {item.title && (
                      <h3 className="text-lg font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Zoom indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlideComponent>
        ))}
      </SwiperComponent>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-5 h-5 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-5 h-5 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <style jsx>{`
        .project-swiper-container {
          position: relative;
          padding: 40px 0;
        }

        .project-swiper .swiper-slide {
          transition: all 0.4s ease;
        }

        .project-swiper .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.85);
          opacity: 0.7;
        }

        .project-swiper .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }

        .project-swiper .swiper-pagination {
          bottom: 10px;
        }

        .project-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .project-swiper .swiper-pagination-bullet-active {
          background: rgb(var(--primary));
          transform: scale(1.3);
        }

        .media-wrapper {
          aspect-ratio: 4/3;
          min-height: 250px;
        }

        @media (max-width: 640px) {
          .project-swiper-container {
            padding: 20px 0;
          }

          .media-wrapper {
            aspect-ratio: 16/10;
            min-height: 200px;
          }
        }
      `}</style>
    </div>
  );
}

// Main component with dynamic import
const ProjectSwiper = dynamic(() => Promise.resolve(ClientSideSwiper), {
  ssr: false,
  loading: () => (
    <div className="project-swiper-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        ))}
      </div>
    </div>
  )
});

export default ProjectSwiper;