// GitHub Pages 환경 감지 및 설정
export const isGitHubPages = (): boolean => {
  return window.location.hostname.includes('github.io') || 
         window.location.hostname.includes('github.com');
};

// API 베이스 URL 설정
export const getApiBaseUrl = (): string => {
  if (isGitHubPages()) {
    // GitHub Pages에서는 로컬 스토리지 사용
    return '';
  }
  // 로컬 개발 환경
  return '';
};

// GitHub Pages용 환경 설정
export const GITHUB_PAGES_CONFIG = {
  // GitHub Pages에서는 정적 파일만 서빙 가능
  enableMockApi: isGitHubPages(),
  // 로컬 스토리지 키 프리픽스
  storagePrefix: 'sdg_app_',
  // 디버그 모드
  debug: !isGitHubPages(),
};