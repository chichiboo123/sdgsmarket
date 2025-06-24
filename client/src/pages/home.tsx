import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Plus, Heart, Star, Globe, Users, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import { SDGCard } from '@/components/SDGCard';
import { CartModal } from '@/components/CartModal';
import { CartSummaryBar } from '@/components/CartSummaryBar';
import BannerCarousel from '@/components/BannerCarousel';
import { GitHubPagesNotice } from '@/components/ui/github-pages-notice';
import { sdgGoals } from '@/lib/sdgData';

export default function Home() {
  const { count } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GitHubPagesNotice />

        {/* Educational Banner Carousel */}
        <section className="mb-12">
          <BannerCarousel />
        </section>

        {/* SDG Goals Section */}
        <section id="goals" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Do Hyeon', sans-serif" }}>판매중인 상품</h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium" style={{ fontFamily: "'Do Hyeon', sans-serif" }}>SDGs 지속가능발전목표 17개</p>
          </div>

          {/* SDG Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sdgGoals.map((goal) => (
              <SDGCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      </main>

      {count > 0 && <CartSummaryBar />}
    </div>
  );
}