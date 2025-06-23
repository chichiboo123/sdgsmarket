import { Link } from 'wouter';
import { ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import logoPath from '@/assets/logo.png';

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 md:h-20 py-2 md:py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
              <img src={logoPath} alt="SDGs 마켓 로고" className="w-10 h-10 md:w-12 md:h-12" />
              <div>
                <h1 className="site-title">
                  SDGs 마켓
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium">지속가능발전목표 쇼핑몰</p>
              </div>
            </div>
          </Link>

          {/* Navigation - Removed per requirements */}
          <nav className="hidden md:flex items-center space-x-8">
          </nav>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <button className="relative p-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="w-6 h-6" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
