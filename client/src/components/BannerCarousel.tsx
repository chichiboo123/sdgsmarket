import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { bannerSlides } from '@/lib/sdgData';
import { Button } from '@/components/ui/button'; // Assuming a Button component exists

const getSlideUrl = (slideId: string): string => {
  switch (slideId) {
    case 'sdg-intro':
      return 'https://www.odakorea.go.kr/teen/cont/ContShow?cont_seq=32';
    case 'sdg-goals':
      return 'https://www.odakorea.go.kr/teen/NationalSustainableDevelopmentGoals';
    case 'sdg-animation':
      return 'https://youtu.be/kwzSaqlcpHI?feature=shared';
    default:
      return '#';
  }
};

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-48 md:h-64 lg:h-80">
        {bannerSlides.map((slide, index) =>
          index === currentSlide ? (
            <div
              key={slide.id}
              className={`carousel-slide absolute inset-0 bg-gradient-to-r ${slide.background} flex items-center justify-between px-8 md:px-16`}
            >
              <div className="text-white max-w-lg">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.subtitle}</p>
                <a
                  href={getSlideUrl(slide.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className={slide.buttonColor}>자세히 살펴보기</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full bg-white transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}