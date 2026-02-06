import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getBannersForn, type BannerForn } from '../../api/banners';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

export default function SupplierCarousel() {
  const [banners, setBanners] = useState<BannerForn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannersForn('logo');
        setBanners(data);
      } catch (error) {
        console.error("Falha ao buscar banners de fornecedores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Carregando parceiros...</div>;
  }

  if (!banners.length) {
    return null; // Não renderiza nada se não houver banners
  }

  return (
    <div className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">Nossos Principais Fornecedores</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="supplier-carousel"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.ID_BANNER_BAN} className="flex justify-center items-center">
              <a href={banner.LINK_EMPRESA} target="_blank" rel="noopener noreferrer" className="h-24 flex items-center">
                <img 
                  src={`https://www.ciadascompras.com.br/img/${banner.LOGO_GRANDE}`} 
                  alt={`Logo Fornecedor`} 
                  className="max-h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}