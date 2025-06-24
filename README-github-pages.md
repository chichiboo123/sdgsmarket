# GitHub Pages 배포 가이드

이 프로젝트를 GitHub Pages에 배포하는 방법입니다.

## 사전 준비

1. 이 프로젝트를 GitHub 리포지토리에 업로드합니다.
2. GitHub 리포지토리의 Settings > Pages에서 GitHub Pages를 활성화합니다.

## 자동 배포 설정

`.github/workflows/deploy.yml` 파일이 이미 설정되어 있어서, `main` 브랜치에 코드를 푸시하면 자동으로 배포됩니다.

### GitHub Pages 설정 방법:

1. GitHub 리포지토리로 이동
2. Settings 탭 클릭
3. 왼쪽 메뉴에서 "Pages" 클릭
4. Source를 "GitHub Actions"로 설정

## 수동 배포

로컬에서 수동으로 배포하려면:

```bash
# GitHub Pages용 빌드
node build-gh-pages.js

# gh-pages 브랜치에 배포
npx gh-pages -d dist/public
```

## 주의사항

- 현재 프로젝트는 풀스택 애플리케이션이므로, GitHub Pages에서는 프론트엔드만 작동합니다
- 백엔드 API 호출은 작동하지 않습니다
- 데이터베이스 연결이 필요한 기능은 GitHub Pages에서 작동하지 않습니다

## 프론트엔드 전용 버전으로 수정

GitHub Pages에서 완전히 작동하는 버전을 만들려면:

1. API 호출을 모크 데이터로 대체
2. 로컬 스토리지를 사용한 데이터 저장
3. 클라이언트 사이드 전용 기능으로 변경

필요시 이러한 수정을 도와드릴 수 있습니다.