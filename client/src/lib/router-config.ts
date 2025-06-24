// GitHub Pages 라우터 설정 유틸리티
export const getBasePath = (): string => {
  // GitHub Pages 환경 감지
  const hostname = window.location.hostname;
  
  if (hostname.includes('github.io')) {
    // GitHub Pages에서는 첫 번째 경로 세그먼트가 리포지토리 이름
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : '/';
  }
  
  // 로컬 개발 환경
  return '/';
};

// 절대 경로를 상대 경로로 변환
export const getRouterPath = (path: string): string => {
  const basePath = getBasePath();
  if (basePath === '/') return path;
  return path;
};

// 링크 URL 생성
export const createLinkUrl = (path: string): string => {
  const basePath = getBasePath();
  if (basePath === '/') return path;
  return `${basePath}${path}`;
};