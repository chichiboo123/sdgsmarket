
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <a 
          href="https://litt.ly/chichiboo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm block"
        >
          created by. 교육뮤지컬 꿈꾸는 치수쌤
        </a>
        <p className="text-gray-500 text-xs">
          이 웹페이지는 SDGs 교육을 위한 학습용 사이트로, 실제 결제나 상품 배송은 이루어지지 않습니다.
        </p>
      </div>
    </footer>
  );
}
