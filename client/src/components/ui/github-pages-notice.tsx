import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isGitHubPages } from '@/lib/githubPagesConfig';

export function GitHubPagesNotice() {
  if (!isGitHubPages()) {
    return null;
  }

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        GitHub Pages 환경에서 실행 중입니다. 모든 데이터는 브라우저 로컬 스토리지에 저장됩니다.
      </AlertDescription>
    </Alert>
  );
}