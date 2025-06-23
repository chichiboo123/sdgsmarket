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
    title: "빈곤 종료", 
    subtitle: "모든 형태의 빈곤 종료", 
    color: "#e5243b", 
    icon: "🏠",
    description: "전 세계 모든 형태의 빈곤을 종료합니다."
  },
  { 
    id: 2, 
    title: "기아 종료", 
    subtitle: "기아 종료, 식량안보 확보", 
    color: "#dda63a", 
    icon: "🌾",
    description: "기아를 종료하고, 식량 안보를 확보하며 개선된 영양상태를 달성하고 지속가능한 농업을 증진합니다."
  },
  { 
    id: 3, 
    title: "건강과 웰빙", 
    subtitle: "모든 연령층의 건강한 삶 보장", 
    color: "#4c9f38", 
    icon: "💚",
    description: "모든 연령층을 위한 건강한 삶을 보장하고 복지를 증진합니다."
  },
  { 
    id: 4, 
    title: "양질의 교육", 
    subtitle: "모두를 위한 포용적이고 공평한 양질의 교육", 
    color: "#c5192d", 
    icon: "📚",
    description: "모두를 위한 포용적이고 공평한 양질의 교육을 보장하고 평생학습 기회를 증진합니다."
  },
  { 
    id: 5, 
    title: "성평등", 
    subtitle: "성평등 달성 및 모든 여성과 소녀의 권한 강화", 
    color: "#ff3a21", 
    icon: "⚖️",
    description: "성평등을 달성하고 모든 여성과 소녀의 권한을 강화합니다."
  },
  { 
    id: 6, 
    title: "깨끗한 물과 위생", 
    subtitle: "모두를 위한 물과 위생의 이용가능성과 지속가능한 관리", 
    color: "#26bde2", 
    icon: "💧",
    description: "모두를 위한 물과 위생의 이용가능성과 지속가능한 관리를 보장합니다."
  },
  { 
    id: 7, 
    title: "깨끗한 에너지", 
    subtitle: "모두를 위한 저렴하고 신뢰할 수 있는 지속가능한 현대적 에너지", 
    color: "#fcc30b", 
    icon: "⚡",
    description: "모두를 위한 저렴하고 신뢰할 수 있으며 지속가능한 현대적 에너지에 대한 접근을 보장합니다."
  },
  { 
    id: 8, 
    title: "양질의 일자리", 
    subtitle: "지속가능한 경제성장 및 완전고용과 양질의 일자리", 
    color: "#a21942", 
    icon: "💼",
    description: "지속가능한 경제성장 및 모두를 위한 완전고용과 양질의 일자리를 증진합니다."
  },
  { 
    id: 9, 
    title: "산업혁신과 인프라", 
    subtitle: "복원력 있는 인프라 구축, 지속가능한 산업화 증진", 
    color: "#fd6925", 
    icon: "🏭",
    description: "복원력 있는 인프라를 구축하고, 포용적이고 지속가능한 산업화를 증진하며 혁신을 장려합니다."
  },
  { 
    id: 10, 
    title: "불평등 완화", 
    subtitle: "국내 및 국가 간 불평등 감소", 
    color: "#dd1367", 
    icon: "🤝",
    description: "국내 및 국가 간 불평등을 감소시킵니다."
  },
  { 
    id: 11, 
    title: "지속가능한 도시", 
    subtitle: "포용적이고 안전하며 복원력 있고 지속가능한 도시와 주거지", 
    color: "#fd9d24", 
    icon: "🏙️",
    description: "포용적이고 안전하며 복원력 있고 지속가능한 도시와 거주지를 조성합니다."
  },
  { 
    id: 12, 
    title: "책임감 있는 소비", 
    subtitle: "지속가능한 소비와 생산 양식의 보장", 
    color: "#bf8b2e", 
    icon: "♻️",
    description: "지속가능한 소비와 생산 양식을 보장합니다."
  },
  { 
    id: 13, 
    title: "기후행동", 
    subtitle: "기후변화와 그로 인한 영향에 맞서기 위한 긴급 대응", 
    color: "#3f7e44", 
    icon: "🌍",
    description: "기후변화와 그로 인한 영향에 맞서기 위한 긴급 대응을 취합니다."
  },
  { 
    id: 14, 
    title: "해양생태계", 
    subtitle: "지속가능발전을 위한 대양, 바다, 해양자원의 보전과 지속가능한 이용", 
    color: "#0a97d9", 
    icon: "🐠",
    description: "지속가능발전을 위한 대양, 바다, 해양자원을 보전하고 지속가능하게 이용합니다."
  },
  { 
    id: 15, 
    title: "육상생태계", 
    subtitle: "육상 생태계 보호, 복원 및 지속가능한 이용 증진", 
    color: "#56c02b", 
    icon: "🌳",
    description: "육상 생태계를 보호, 복원 및 지속가능한 이용을 증진하고, 지속가능한 산림 관리, 사막화 방지, 토지 황폐화 중단 및 복원, 생물다양성 손실을 중단합니다."
  },
  { 
    id: 16, 
    title: "평화와 정의", 
    subtitle: "평화롭고 포용적인 사회 증진", 
    color: "#00689d", 
    icon: "⚖️",
    description: "지속가능발전을 위한 평화롭고 포용적인 사회를 증진하고, 모두에게 정의에 대한 접근을 제공하며, 모든 수준에서 효과적이고 책임감 있으며 포용적인 제도를 구축합니다."
  },
  { 
    id: 17, 
    title: "파트너십", 
    subtitle: "지속가능발전을 위한 글로벌 파트너십 강화", 
    color: "#19486a", 
    icon: "🤝",
    description: "지속가능발전을 위한 이행수단을 강화하고 글로벌 파트너십을 활성화합니다."
  }
];

export const bannerSlides = [
  {
    id: 1,
    title: "SDGs란 무엇인가요?",
    subtitle: "지속가능발전목표는 모든 사람이 평화롭고 풍요로운 삶을 누릴 수 있도록 하는 17개의 글로벌 목표입니다.",
    background: "from-blue-500 to-green-500",
    buttonText: "자세히 알아보기",
    buttonColor: "text-blue-600"
  },
  {
    id: 2,
    title: "17개의 목표",
    subtitle: "빈곤 퇴치부터 기후행동까지, 우리 모두가 함께 만들어가는 더 나은 세상을 위한 목표들을 만나보세요!",
    background: "from-purple-500 to-pink-500",
    buttonText: "목표 둘러보기",
    buttonColor: "text-purple-600"
  },
  {
    id: 3,
    title: "SDGs 애니메이션",
    subtitle: "재미있는 애니메이션으로 SDGs를 더 쉽게 이해해보세요!",
    background: "from-orange-500 to-red-500",
    buttonText: "영상 보기",
    buttonColor: "text-red-600",
    isVideo: true,
    videoUrl: "https://www.youtube.com/watch?v=kwzSaqlcpHI"
  }
];
