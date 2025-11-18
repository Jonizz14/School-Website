import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Keyboard,
  Zoom,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "./Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticImages = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      download_url: `https://picsum.photos/1920/1080?random=${i + 1}`,
      author: `Demo ${i + 1}`,
    }));

    setImages(staticImages);
    setLoading(false);
  }, []);

  if (loading) return <div className="gallery-loading">Loading...</div>;

  return (
    <div className="fullscreen-gallery">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Zoom, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 5 }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        allowTouchMove={false}
        className="gallery-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="swiper-zoom-container fullscreen-slide">
              <img src={image.download_url} alt={image.author} />
              <p className="gallery-caption">By {image.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Gallery;
