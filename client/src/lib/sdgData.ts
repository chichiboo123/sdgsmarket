export interface SDGGoal {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  description: string;
}

export const sdgGoals: SDGGoal[] = [
  { 
    id: 1, 
    title: "빈곤 퇴치", 
    subtitle: "모든 형태의 빈곤 종료", 
    color: "#e5243b", 
    icon: "🏠",
    description: "모든 곳에서 모든 형태의 빈곤 종식"
  },
  { 
    id: 2, 
    title: "기아 종식", 
    subtitle: "기아 종료, 식량안보 확보", 
    color: "#dda63a", 
    icon: "🌾",
    description: "기아 종식, 식량안보 달성, 개선된 영양상태의 달성과 지속가능한 농업 강화"
  },
  { 
    id: 3, 
    title: "건강과 웰빙", 
    subtitle: "모든 연령층의 건강한 삶 보장", 
    color: "#4c9f38", 
    icon: "💚",
    description: "모든 연령층을 위한 건강한 삶 보장과 웰빙 증진"
  },
  { 
    id: 4, 
    title: "양질의 교육", 
    subtitle: "모두를 위한 포용적이고 공평한 양질의 교육", 
    color: "#c5192d", 
    icon: "📚",
    description: "포용적이고 공평한 양질의 교육보장과 모두를 위한 평생학습 기회 증진"
  },
  { 
    id: 5, 
    title: "성평등", 
    subtitle: "성평등 달성 및 모든 여성과 소녀의 권한 강화", 
    color: "#ff3a21", 
    icon: "⚖️",
    description: "성평등 달성과 모든 여성 및 여아의 권익신장"
  },
  { 
    id: 6, 
    title: "깨끗한 물과 위생", 
    subtitle: "모두를 위한 물과 위생의 이용가능성과 지속가능한 관리", 
    color: "#26bde2", 
    icon: "💧",
    description: "모두를 위한 물과 위생의 이용가능성과 지속가능한 관리 보장"
  },
  { 
    id: 7, 
    title: "모두를 위한 깨끗한 에너지", 
    subtitle: "모두를 위한 저렴하고 신뢰할 수 있는 지속가능한 현대적 에너지", 
    color: "#fcc30b", 
    icon: "⚡",
    description: "모두를 위한 적정가격의 신뢰할 수 있고 지속가능하며 현대적인 에너지에 대한 접근 보장"
  },
  { 
    id: 8, 
    title: "양질의 일자리와 경제성장", 
    subtitle: "지속가능한 경제성장 및 완전고용과 양질의 일자리", 
    color: "#a21942", 
    icon: "💼",
    description: "지속적･포용적･지속가능한 경제성장, 완전하고 생산적인 고용과 모두를 위한 양질의 일자리 증진"
  },
  { 
    id: 9, 
    title: "산업·혁신·사회기반시설", 
    subtitle: "복원력 있는 인프라 구축, 지속가능한 산업화 증진", 
    color: "#fd6925", 
    icon: "🏭",
    description: "회복력 있는 사회기반시설 구축, 포용적이고 지속가능한 산업화 증진과 혁신 도모"
  },
  { 
    id: 10, 
    title: "불평등 감소", 
    subtitle: "국내 및 국가 간 불평등 감소", 
    color: "#dd1367", 
    icon: "🤝",
    description: "국내 및 국가 간 불평등 감소"
  },
  { 
    id: 11, 
    title: "지속가능한 도시와 공동체", 
    subtitle: "포용적이고 안전하며 복원력 있고 지속가능한 도시와 주거지", 
    color: "#fd9d24", 
    icon: "🏙️",
    description: "포용적이고 안전하며 회복력 있고 지속가능한 도시와 주거지 조성"
  },
  { 
    id: 12, 
    title: "지속가능한 생산과 소비", 
    subtitle: "지속가능한 소비와 생산 양식의 보장", 
    color: "#bf8b2e", 
    icon: "♻️",
    description: "지속가능한 소비와 생산 양식의 보장"
  },
  { 
    id: 13, 
    title: "기후변화 대응", 
    subtitle: "기후변화와 그로 인한 영향에 맞서기 위한 긴급 대응", 
    color: "#3f7e44", 
    icon: "🌍",
    description: "기후변화와 그로 인한 영향에 맞서기 위한 긴급 대응"
  },
  { 
    id: 14, 
    title: "해양생태계 보존", 
    subtitle: "지속가능발전을 위한 대양, 바다, 해양자원의 보전과 지속가능한 이용", 
    color: "#0a97d9", 
    icon: "🐠",
    description: "지속가능발전을 위하여 대양, 바다, 해양자원의 보전과 지속 가능한 이용"
  },
  { 
    id: 15, 
    title: "육상생태계 보존", 
    subtitle: "육상 생태계 보호, 복원 및 지속가능한 이용 증진", 
    color: "#56c02b", 
    icon: "🌳",
    description: "육상생태계 보호, 복원 및 지속가능한 이용 증진, 지속가능한 산림 관리, 사막화 방지, 토지황폐화 중지와 회복, 생물다양성 손실 중단"
  },
  { 
    id: 16, 
    title: "정의 · 평화 · 효과적인 제도", 
    subtitle: "평화롭고 포용적인 사회 증진", 
    color: "#00689d", 
    icon: "⚖️",
    description: "지속가능발전을 위한 평화롭고 포용적인 사회 증진, 모두에게 정의 보장과 모든 수준에서 효과적이고 책임성 있으며 포용적인 제도 구축"
  },
  { 
    id: 17, 
    title: "글로벌 파트너쉽", 
    subtitle: "지속가능발전을 위한 글로벌 파트너십 강화", 
    color: "#19486a", 
    icon: "🤝",
    description: "이행수단 강화와 지속가능발전을 위한 글로벌 파트너십 재활성화"
  }
];

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  background: string;
  buttonText: string;
  buttonColor: string;
  linkTo?: string;
  isExternal?: boolean;
  externalUrl?: string;
  isVideo?: boolean;
  videoUrl?: string;
  image?: string;
}

export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "SDGs란 무엇인가요?",
    subtitle: "지속가능발전목표는 모든 사람이 평화롭고 풍요로운 삶을 누릴 수 있도록 하는 17개의 글로벌 목표입니다.",
    background: "from-blue-500 to-green-500",
    buttonText: "자세히 알아보기",
    buttonColor: "text-blue-600",
    isExternal: true,
    externalUrl: "https://www.ncsd.go.kr/unsdgs?content=1",
    image: "/src/assets/sdg-icons-search.png"
  },
  {
    id: 2,
    title: "SDGs 17의 목표",
    subtitle: "빈곤 퇴치부터 기후행동까지, 우리 모두가 함께 만들어가는 더 나은 세상을 위한 목표들을 만나보세요!",
    background: "from-purple-500 to-pink-500",
    buttonText: "목표 둘러보기",
    buttonColor: "text-purple-600",
    isExternal: true,
    externalUrl: "https://www.ncsd.go.kr/unsdgs?content=2",
    image: "/src/assets/sdg-17-goals.png"
  },
  {
    id: 3,
    title: "SDGs 애니메이션",
    subtitle: "재미있는 애니메이션으로 SDGs를 더 쉽게 이해해보세요!",
    background: "from-orange-500 to-red-500",
    buttonText: "영상 보기",
    buttonColor: "text-red-600",
    isVideo: true,
    videoUrl: "https://www.youtube.com/watch?v=kwzSaqlcpHI",
    image: "/src/assets/sdg-animation.png"
  }
];
