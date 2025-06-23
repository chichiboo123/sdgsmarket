import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import sdgImagePath from '@assets/ChatGPT Image 2025년 6월 23일 오전 11_07_37_1750644460497.png';

export default function AboutSDGs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">SDGs란 무엇인가요?</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
            <img 
              src={sdgImagePath} 
              alt="SDGs 목표들" 
              className="w-80 h-80 object-contain"
            />
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">지속가능발전목표(UN-SDGs)</h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  2015년 제 70차 UN총회에서 2030년까지 달성하기로 결의한 의제인 지속가능발전목표(SDGs:Sustainable Development Goals)는 지속가능발전의 이념을 실현하기 위한 인류 공동의 17개 목표입니다.
                </p>
                <p>
                  '2030 지속가능발전 의제'라고도 하는 지속가능발전목표(SDGs)는 '단 한 사람도 소외되지 않는 것(Leave no one behind)'이라는 슬로건과 함께 인간, 지구, 번영, 평화, 파트너십이라는 5개 영역에서 인류가 나아가야 할 방향성을 17개 목표와 169개 세부 목표로 제시하고 있습니다.
                </p>
              </div>
            </div>

            {/* 5개 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-700 mb-3">인간</h3>
                <p className="text-gray-700">
                  우리는 모든 형태와 차원의 빈곤과 기아를 종식하고, 모든 인간이 존엄과 평등 속에, 그리고 건강한 환경에서 자신의 잠재력을 실현할 수 있도록 보장할 것을 결의한다.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-700 mb-3">지구</h3>
                <p className="text-gray-700">
                  우리는 현세대와 미래 세대의 필요를 지원할 수 있도록 지속가능한 소비와 생산을 하고, 지구 천연자원을 지속가능한 방식으로 관리하며, 기후변화에 대한 시급한 조치를 하는 등으로 지구를 황폐화되지 않도록 보호할 것을 결의한다.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-700 mb-3">번영</h3>
                <p className="text-gray-700">
                  우리는 모든 인간이 풍요롭고 보람 있는 삶을 향유할 수 있고 자연과의 조화 속에 경제, 사회, 기술의 진보가 이루어지도록 보장할 것을 결의한다.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-700 mb-3">평화</h3>
                <p className="text-gray-700">
                  우리는 공포와 폭력이 없는 평화롭고 공정하며 포용적인 사회를 만들 것을 결의한다. 평화 없는 지속가능한 개발은 있을 수 없으며, 지속가능한 발전 없는 평화는 있을 수 없다.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 md:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-bold text-purple-700 mb-3">파트너십</h3>
                <p className="text-gray-700">
                  우리는 강화된 글로벌 연대의 정신에 기초하고, 특히 최빈곤층과 최취약층의 요구에 초점을 맞추며, 모든 국가, 모든 이해관계자 및 모든 사람이 참여하는 활성화된 지속가능발전 글로벌 파트너십(Global Partnership for Sustainable Development)을 통해 본 의제의 이행에 요구되는 수단을 동원할 것을 결의한다.
                </p>
              </div>
            </div>

            {/* 출처 */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                출처 : 지속가능발전포털 <a href="https://ncsd.go.kr/unsdgs?content=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ncsd.go.kr/unsdgs?content=1</a>
              </p>
            </div>

            {/* 행동 유도 */}
            <div className="text-center pt-6">
              <Link href="/">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  SDGs 목표 둘러보러 가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}