import { useState } from 'react';
import Header from '@/components/Header';
import BannerCarousel from '@/components/BannerCarousel';
import SDGCard from '@/components/SDGCard';
import CartSummaryBar from '@/components/CartSummaryBar';
import { sdgGoals } from '@/lib/sdgData';
import { useCart } from '@/hooks/use-cart';

export default function Home() {
  const { count } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Educational Banner Carousel */}
        <section className="mb-12">
          <BannerCarousel />
        </section>

        {/* SDG Goals Section */}
        <section id="goals" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">17개 지속가능발전목표</h2>
            <p className="text-lg text-gray-600">관심 있는 목표를 선택하여 실천계획을 세워보세요!</p>
          </div>

          {/* SDG Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sdgGoals.map((goal) => (
              <SDGCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      </main>

      {count > 0 && <CartSummaryBar />}
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href="https://litt.ly/chichiboo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
          >
            created by. 교육뮤지컬 꿈꾸는 치수쌤
          </a>
        </div>
      </footer>
    </div>
  );
}
