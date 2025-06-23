import { Link } from 'wouter';
import { ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                <Globe className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-600">SDGs 마켓</h1>
                <p className="text-xs text-gray-600">지속가능발전목표 쇼핑몰</p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#goals" className="text-gray-700 hover:text-blue-600 font-medium">SDGs 목표</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">SDGs란?</a>
            <a href="#education" className="text-gray-700 hover:text-blue-600 font-medium">교육자료</a>
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
